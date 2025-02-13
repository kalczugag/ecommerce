import express from "express";
import { isValidObjectId } from "mongoose";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";

const parser = new MongooseQueryParser();

export const getProductById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;
    const parsedQuery = parser.parse(req.query);

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid product ID format", 400));
    }

    try {
        const product = await ProductModel.findById(id)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .exec();

        if (!product) {
            return res
                .status(404)
                .json(errorResponse(null, "Product not found", 404));
        }

        return res.status(200).json(successResponse(product));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
