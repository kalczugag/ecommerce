import express from "express";
import { DeliveryMethodModel } from "../../models/DeliveryMethod";

export const getAllDeliveryMethods = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const deliveryMethods = await DeliveryMethodModel.find();

        if (!deliveryMethods || deliveryMethods.length === 0) {
            return res.status(404).json({ error: "No delivery methods found" });
        }

        return res.status(200).json(deliveryMethods);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
