import express from "express";
import schema from "./schemaValidate";
import { ReturnModel } from "../../models/Order/Return";
import { OrderModel } from "../../models/Order";
import type { ReturnOrder } from "../../types/Order";

export const createReturn = async (
    req: express.Request<{}, {}, ReturnOrder>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    const orderReturn = req.body;

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const order = await OrderModel.findById(orderReturn._order);

        if (!order?._payment) {
            return res.status(400).json({ error: "Order cannot be returned" });
        }

        const newReturn = new ReturnModel(req.body);

        await newReturn.save();

        await OrderModel.findByIdAndUpdate(newReturn._order, {
            status: "returned",
        });

        return res
            .status(201)
            .json({ msg: "Return added successfully", data: newReturn });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
