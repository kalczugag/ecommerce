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
        const deliveryMethod = await DeliveryMethodModel.findOne({
            providers: { $elemMatch: { _id: id } },
        });

        if (!deliveryMethod) {
            return res.status(404).json({ error: "Delivery method not found" });
        }

        const provider = deliveryMethod.providers.find(
            (provider) => provider._id?.toString() === id
        );

        if (!provider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        return res.status(200).json({
            _deliveryMethod: deliveryMethod._id,
            provider,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
