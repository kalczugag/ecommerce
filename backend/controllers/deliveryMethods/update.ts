import express from "express";
import { isValidObjectId } from "mongoose";
import { DeliveryMethodModel } from "../../models/DeliveryMethod";
import type { DeliveryMethod } from "../../types/DeliveryMethod";

export const updateDeliveryMethod = async (
    req: express.Request<{ id: string }, {}, DeliveryMethod>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        const updatedDeliveryMethod =
            await DeliveryMethodModel.findByIdAndUpdate(id, updates, {
                new: true,
            });

        if (!updatedDeliveryMethod) {
            return res.status(404).json({ error: "Delivery method not found" });
        }

        return res.status(200).json(updatedDeliveryMethod);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
