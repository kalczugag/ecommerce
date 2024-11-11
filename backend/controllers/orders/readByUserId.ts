import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import type { PaginatedOrders } from "../../types/Order";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getOrdersByUserId = async (
    req: express.Request<{ userId: string }, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const { userId } = req.params;
    const { skip = 0, limit = 10, ...rest } = req.query;

    const parsedQuery = parser.parse(rest);

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const totalDocuments = await OrderModel.countDocuments({
            _user: userId,
        });

        const orders = await OrderModel.find({ _user: userId })
            .populate({
                path: "_user",
                select: "firstName lastName phone address",
            })
            .populate("items.product")
            .sort({ createdAt: -1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        console.log(orders);

        if (!orders) {
            return res.status(404).json({ error: "Orders not found" });
        }

        return res.status(200).json({ data: orders, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
