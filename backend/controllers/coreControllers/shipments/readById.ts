import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { ShipmentModel } from "../../../models/Order/Shipment";

export const getShipmentById = async (
    req: express.Request<{ id: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next(errorResponse(null, "Shipment ID is required", 400));
    }

    try {
        const shipment = await ShipmentModel.findById(id)
            .populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            })
            .exec();

        if (!shipment) {
            return next(errorResponse(null, "Shipment not found", 404));
        }

        return res.status(200).json(successResponse(shipment));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
