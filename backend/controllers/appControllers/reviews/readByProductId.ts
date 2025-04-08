import express from "express";
import { isValidObjectId } from "mongoose";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReviewModel } from "../../../models/Review";
import type { PaginatedReviews } from "../../../types/Review";

const parser = new MongooseQueryParser();

export const getReviewsByProduct = async (
    req: express.Request<{ id: string }, {}, {}, PaginatedReviews>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid product ID format", 400));
    }

    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 10;

    try {
        const reviews = await ReviewModel.find({ _product: id })
            .select(parsedQuery.select)
            .sort(parsedQuery.sort || { createdAt: -1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();
        const totalDocuments = await ReviewModel.countDocuments({
            _product: id,
        });

        if (!reviews) {
            return res
                .status(404)
                .json(errorResponse(null, "Product reviews not found", 404));
        }

        return res
            .status(200)
            .json(successResponse(reviews, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
