import express from "express";
import { OrderModel } from "../../models/Order";
import { PaginatedOrders } from "../../types/Order";
import { MongooseQueryParser } from "mongoose-query-parser";

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
        const orders = await OrderModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await OrderModel.countDocuments(
            parsedQuery.filter
        );

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        return res.status(200).json({
            data: orders,
            count: totalDocuments,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
