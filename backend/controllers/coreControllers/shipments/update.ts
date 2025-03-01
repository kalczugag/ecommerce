import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { NoteModel } from "../../../models/Order/Notes";
import type { Shipment } from "../../../types/Order";

export const updateShipment = async (
    req: express.Request<{ id: string }, {}, Partial<Shipment>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid shipment ID format", 400));
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        if (updates.notes && updates.notes.length > 0) {
            const deliveryNotes = await NoteModel.insertMany(updates.notes);

            updates.notes = deliveryNotes.map((note) => note._id.toString());
        }

        if (updates.trackingNumber) {
            const shipment = await ShipmentModel.findById(id);

            if (!shipment) {
                return res
                    .status(404)
                    .json(errorResponse(null, "Shipment not found", 404));
            }

            if (shipment.trackingNumber && shipment.status !== "pending") {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            null,
                            "Shipment already has a tracking number",
                            400
                        )
                    );
            }
        }

        const updatedShipment = await ShipmentModel.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
            }
        );

        if (!updatedShipment) {
            return res
                .status(404)
                .json(errorResponse(null, "Shipment not found", 404));
        }

        return res
            .status(200)
            .json(
                successResponse(
                    updatedShipment,
                    "Shipment updated successfully"
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
