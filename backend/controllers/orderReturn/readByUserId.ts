import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import type { PaginatedOrders } from "../../types/Order";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getReturnsByUserId = async (
    req: express.Request<{ userId: string }, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "Invalid User ID" });
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
            .populate(
                parsedQuery.populate || [
                    {
                        path: "_user",
                        select: "firstName lastName phone address",
                    },
                    {
                        path: "returnedItems",
                        populate: {
                            path: "_product",
                            model: "Product",
                        },
                    },
                ]
            )
            .select(parsedQuery.select)
            .sort(parsedQuery.sort || { createdAt: -1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!orders || orders.length === 0) {
            return res
                .status(404)
                .json({ data: [], error: "Returns not found" });
        }

        return res.status(200).json({ data: orders, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
