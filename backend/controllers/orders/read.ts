import express from "express";
import { OrderModel } from "@/models/Order";

export const getAllOrders = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const orders = await OrderModel.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
