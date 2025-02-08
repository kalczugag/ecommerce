import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import { enhanceShipments } from "../../utils/enhanceShipments";

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
            .populate("_user", "firstName lastName email phone address")
            .populate("payments")
            .populate({
                path: "shipments",
            })
            .populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            })
            .exec();

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const enhancedShipments = await enhanceShipments(order.shipments);

        const enhancedOrder = {
            ...order.toObject(),
            shipments: enhancedShipments,
        };

        return res.status(200).json(enhancedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
