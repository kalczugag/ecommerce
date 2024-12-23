import express from "express";
import { isValidObjectId } from "mongoose";
import { DeliveryMethodModel } from "../../models/DeliveryMethod";

export const getDeliveryMethodsByProviderId = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json({ error: "Delivery method ID is required" });
    }

    try {
        const deliveryMethod = await DeliveryMethodModel.findOne(
            { "providers._id": id },
            { _id: 1, type: 1, metadata: 1, "providers.$": 1 }
        );

        if (!deliveryMethod) {
            return res.status(404).json({ error: "Delivery method not found" });
        }

        return res.status(200).json(deliveryMethod);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
