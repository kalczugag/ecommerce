import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";
import type { DeliveryMethod } from "../../../types/DeliveryMethod";

export const updateDeliveryMethod = async (
    req: express.Request<{ id: string }, {}, Partial<DeliveryMethod>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(
                errorResponse(null, "Invalid delivery method ID format", 400)
            );
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const updatedDeliveryMethod =
            await DeliveryMethodModel.findByIdAndUpdate(id, updates, {
                new: true,
            });

        if (!updatedDeliveryMethod) {
            return res
                .status(404)
                .json(errorResponse(null, "Delivery method not found", 404));
        }

        return res.status(200).json(successResponse(updatedDeliveryMethod));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
