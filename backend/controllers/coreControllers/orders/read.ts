import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { PaginatedOrders } from "../../../types/Order";
import { MongooseQueryParser } from "mongoose-query-parser";

const statusPriority = {
    placed: 1,
    confirmed: 2,
    shipped: 3,
    delivered: 4,
    "pending payment": 5,
    returned: 6,
    canceled: 7, // Lowest priority
};

const parser = new MongooseQueryParser();

export const getAllOrders = async (
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
        const orders = await OrderModel.aggregate([
            { $match: parsedQuery.filter },
            {
                $addFields: {
                    statusPriority: {
                        $switch: {
                            branches: Object.entries(statusPriority).map(
                                ([key, value]) => ({
                                    case: { $eq: ["$status", key] },
                                    then: value,
                                })
                            ),
                            default: 99,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_user",
                    foreignField: "_id",
                    pipeline: [
                        { $project: { firstName: 1, lastName: 1, email: 1 } },
                    ],
                    as: "_user",
                },
            },
            {
                $set: {
                    _user: { $arrayElemAt: ["$_user", 0] },
                },
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "payments",
                    foreignField: "_id",
                    pipeline: [{ $project: { paymentStatus: 1 } }],
                    as: "payments",
                },
            },
            { $sort: { statusPriority: 1, createdAt: -1 } },
            { $skip: page * pageSize },
            { $limit: pageSize },
        ]);

        const totalDocuments = await OrderModel.countDocuments(
            parsedQuery.filter
        );

        if (!orders.length) {
            return res
                .status(404)
                .json(errorResponse(null, "No orders found", 404));
        }

        return res
            .status(200)
            .json(successResponse(orders, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
