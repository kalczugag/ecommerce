import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "@/models/Order";

export const getOrdersByUserId = async (
    req: express.Request<{ userId: string }>,
    res: express.Response
) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const orders = await OrderModel.find({ _user: userId });

        if (!orders) {
            return res.status(404).json({ error: "Orders not found" });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};