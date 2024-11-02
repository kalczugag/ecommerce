import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import type { PaginatedOrders } from "../../types/Order";

export const getOrdersByUserId = async (
    req: express.Request<{ userId: string }, {}, {}, PaginatedOrders>,
    res: express.Response
) => {
    const { userId } = req.params;
    const { page = 0, pageSize = 10 } = req.query;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const totalDocuments = await OrderModel.countDocuments();

        const orders = await OrderModel.find({ _user: userId })
            .sort({ createdAt: -1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .populate({
                path: "_user",
                select: "firstName lastName phone address",
            })
            .populate("items.product")
            .exec();

        if (!orders) {
            return res.status(404).json({ error: "Orders not found" });
        }

        return res.status(200).json({ data: orders, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
