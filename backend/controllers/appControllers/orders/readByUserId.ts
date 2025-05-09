import express from "express";
import { isValidObjectId } from "mongoose";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { enhanceShipments } from "../../../utils/enhanceShipments";
import type { PaginatedOrders } from "../../../types/Order";

const parser = new MongooseQueryParser();

export const getOrdersByUserId = async (
    req: express.Request<{ userId: string }, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid user ID format", 400));
    }

    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 10;

    try {
        const totalDocuments = await OrderModel.countDocuments({
            ...parsedQuery.filter,
            _user: userId,
        });

        const orders = await OrderModel.find({
            ...parsedQuery.filter,
            _user: userId,
        })
            .populate([
                ...(parsedQuery.populate || []),
                {
                    path: "_user",
                    select: "firstName lastName phone address",
                },
                {
                    path: "items",
                    populate: {
                        path: "_product",
                        model: "Product",
                    },
                },
                {
                    path: "shipments",
                },
            ])

            .select(parsedQuery.select)
            .sort(parsedQuery.sort || { createdAt: -1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!orders || orders.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No orders found", 404));
        }

        const hasMore = (page + 1) * pageSize < totalDocuments;
        const enhancedOrders = await Promise.all(
            orders.map(async (order) => ({
                ...order.toObject(),
                shipments: await enhanceShipments(order.shipments),
            }))
        );

        return res
            .status(200)
            .json(
                successResponse(
                    enhancedOrders,
                    "OK",
                    200,
                    totalDocuments,
                    hasMore,
                    page + 1
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
