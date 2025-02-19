import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { ShipmentModel } from "../../../models/Order/Shipment";
import type { Shipment } from "types/Order";

export const createShipment = async (
    req: express.Request<{}, {}, Shipment>,
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
        const newShipment = new ShipmentModel(req.body);

        await newShipment.save();

        return res
            .status(201)
            .json(
                successResponse(newShipment, "Shipment added successfully", 201)
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
