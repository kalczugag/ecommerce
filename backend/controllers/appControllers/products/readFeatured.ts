import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";

export const getFeaturedProducts = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const products = await ProductModel.find({ featured: true }).limit(10);

        if (!products) {
            return res
                .status(404)
                .json(errorResponse(null, "No featured products found", 404));
        }

        return res.status(200).json(successResponse(products));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
