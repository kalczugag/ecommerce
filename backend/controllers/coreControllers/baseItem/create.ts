import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { BaseItemModel } from "../../../models/BaseItem";
import { OrderModel } from "../../../models/Order";
import type { Item } from "../../../types/Order";

export const createBaseItem = async (
    req: express.Request<{}, {}, Item & { orderId: string }>,
    res: express.Response
) => {
    const { orderId, ...item } = req.body;

    const { error } = schema.validate(item);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    if (!orderId) {
        return res
            .status(400)
            .json(errorResponse(null, "No order ID provided", 400));
    }

    try {
        const newBaseItem = new BaseItemModel(item);
        await newBaseItem.save();

        await OrderModel.findOneAndUpdate(
            { _id: orderId },
            { $push: { items: newBaseItem } },
            { new: true }
        );

        return res
            .status(201)
            .json(
                successResponse(newBaseItem, "Item created successfully", 201)
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
