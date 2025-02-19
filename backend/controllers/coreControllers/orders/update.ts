import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import type { Order } from "../../../types/Order";

export const updateOrder = async (
    req: express.Request<{ id: string }, {}, Partial<Order>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid order ID format", 400));
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedOrder) {
            return res
                .status(404)
                .json(errorResponse(null, "Order not found", 404));
        }

        return res
            .status(200)
            .json(successResponse(updatedOrder, "Order updated successfully"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
