import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReviewModel } from "../../../models/Review";

export const getReviewsByProduct = async (
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
        const result = await ReviewModel.aggregate([
            {
                $match: { _product: id },
            },
            {
                $group: {
                    _id: "$_product",
                    totalDocuments: { $sum: 1 },
                    averageRating: { $avg: "$value" },
                },
            },
        ]);

        const { averageRating, totalDocuments } = result[0] || {
            averageRating: 0,
            totalDocuments: 0,
        };

        return res
            .status(200)
            .json(successResponse(averageRating, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
