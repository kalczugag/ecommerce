import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../../models/Order";

export const deleteOrder = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Order ID is required" });
    }

    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json(deletedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
