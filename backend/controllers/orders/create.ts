import express from "express";
import schema from "./schemaValidate";
import { OrderModel } from "@/models/Order";
import { Order } from "@/types/Order";

export const createOrder = async (
    req: express.Request<{}, {}, Order>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newOrder = new OrderModel(req.body);

        await newOrder.save();

        return res
            .status(201)
            .json({ msg: "Order added successfully", data: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
