import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";
import { WishlistModel } from "../../../models/Wishlist";
import type { User } from "../../../types/User";

export const getFeaturedProducts = async (
    req: express.Request<{}>,
    res: express.Response
) => {
    const user = req.user ? (req.user as User) : null;

    try {
        let products = await ProductModel.find({ featured: true })
            .limit(10)
            .lean()
            .exec();

        if (!products) {
            return res
                .status(404)
                .json(errorResponse(null, "No featured products found", 404));
        }

        if (user) {
            const wishlist = await WishlistModel.findById(user._wishlist, {
                products: 1,
            });
            const wishlistedSet = new Set(
                wishlist?.products?.map((p) => p.toString())
            );

            products = products.map((prod) => ({
                ...(prod ?? prod),
                isFavorite: wishlistedSet.has(prod._id.toString()),
            }));
        }

        return res.status(200).json(successResponse(products));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
