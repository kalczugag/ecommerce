import express from "express";
import { OrderModel } from "@/models/Order";
import { PaginatedOrders } from "@/types/Order";

export const getAllOrders = async (
    req: express.Request<{}, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const { page, pageSize } = req.query;

    try {
        const totalDocuments = await OrderModel.countDocuments();

        const orders = await OrderModel.find()
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        return res.status(200).json({ data: orders, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
