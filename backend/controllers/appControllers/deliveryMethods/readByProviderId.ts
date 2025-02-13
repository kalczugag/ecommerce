import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";

export const getDeliveryMethodsByProviderId = async (
    req: express.Request<{ id: string }>,
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

    try {
        const deliveryMethod = await DeliveryMethodModel.findOne(
            { "providers._id": id },
            { _id: 1, type: 1, metadata: 1, "providers.$": 1 }
        );

        if (!deliveryMethod) {
            return res
                .status(404)
                .json(errorResponse(null, "Delivery method not found", 404));
        }

        return res.status(200).json(successResponse(deliveryMethod));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
