import express from "express";
import { isValidObjectId } from "mongoose";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";
import { WishlistModel } from "../../../models/Wishlist";
import { User } from "../../../types/User";

const parser = new MongooseQueryParser();

export const getProductById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;
    const user = req.user ? (req.user as User) : null;
    const parsedQuery = parser.parse(req.query);

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid product ID format", 400));
    }

    try {
        let product = await ProductModel.findById(id)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .lean()
            .exec();

        if (!product) {
            return res
                .status(404)
                .json(errorResponse(null, "Product not found", 404));
        }

        if (user) {
            const wishlist = await WishlistModel.findById(user._wishlist, {
                products: 1,
            });
            const wishlistedSet = new Set(
                wishlist?.products?.map((p) => p.toString())
            );

            product.isFavorite = wishlistedSet.has(product._id.toString());
        }

        return res.status(200).json(successResponse(product));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
