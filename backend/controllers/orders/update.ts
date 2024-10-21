import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import type { Order } from "../../types/Order";

export const updateOrder = async (
    req: express.Request<{ id: string }, {}, Order>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid order ID format" });
    }

    const {
        status,
        paymentMethod,
        paymentStatus,
        deliveryMethod,
        additionalInfo,
    } = req.body;

    if (
        !status &&
        !paymentMethod &&
        !paymentStatus &&
        !deliveryMethod &&
        !additionalInfo
    ) {
        return res.status(400).json({ error: "No update fields provided" });
    }
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            {
                status,
                paymentMethod,
                paymentStatus,
                deliveryMethod,
                additionalInfo,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.status(200).json({
            msg: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
