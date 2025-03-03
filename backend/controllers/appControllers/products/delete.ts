import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";

export const deleteProduct = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid product ID format", 400));
    }

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res
                .status(404)
                .json(errorResponse(null, "Product not found", 404));
        }

        return res.json(successResponse(deletedProduct, "Product deleted"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
