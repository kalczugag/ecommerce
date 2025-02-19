import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReturnModel } from "../../../models/Order/Return";
import { MongooseQueryParser } from "mongoose-query-parser";
import type { PaginatedOrders } from "../../../types/Order";

const parser = new MongooseQueryParser();

export const getAllReturns = async (
    req: express.Request<{}, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const returns = await ReturnModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await ReturnModel.countDocuments(
            parsedQuery.filter
        );

        if (!returns || returns.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No returns found"));
        }

        return res
            .status(200)
            .json(successResponse(returns, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
