import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";

export const getOrderById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Order ID is required" });
    }

    try {
        const order = await OrderModel.findById(id)
            .populate({
                path: "_user",
                select: "firstName lastName email phone address",
            })
            .populate("items.product")
            .exec();

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
