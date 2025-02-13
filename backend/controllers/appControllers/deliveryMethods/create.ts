import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";
import type { DeliveryMethod } from "../../../types/DeliveryMethod";

export const createDeliveryMethod = async (
    req: express.Request<{}, {}, DeliveryMethod>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

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

    try {
        const newDeliveryMethod = new DeliveryMethodModel(req.body);

        await newDeliveryMethod.save();

        return res
            .status(201)
            .json(
                successResponse(
                    newDeliveryMethod,
                    "Delivery method added successfully",
                    201
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
