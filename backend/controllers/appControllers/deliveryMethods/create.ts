import express from "express";
import schema from "./schemaValidate";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";
import type { DeliveryMethod } from "../../../types/DeliveryMethod";

export const createDeliveryMethod = async (
    req: express.Request<{}, {}, DeliveryMethod>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newDeliveryMethod = new DeliveryMethodModel(req.body);

        await newDeliveryMethod.save();

        return res.status(201).json({
            msg: "Delivery method added successfully",
            data: newDeliveryMethod,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
