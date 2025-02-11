import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { NoteModel } from "../../../models/Order/Notes";
import type { Shipment } from "../../../types/Order";

export const updateShipment = async (
    req: express.Request<{ id: string }, {}, Partial<Shipment>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid shipment ID format" });
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        if (updates.deliveryNotes && updates.deliveryNotes.length > 0) {
            const deliveryNotes = await NoteModel.insertMany(
                updates.deliveryNotes
            );

            updates.deliveryNotes = deliveryNotes.map((note) =>
                note._id.toString()
            );
        }

        const updatedShipment = await ShipmentModel.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
            }
        );

        if (!updatedShipment) {
            return res.status(404).json({ error: "Shipment not found" });
        }

        return res.status(200).json({
            msg: "Shipment updated successfully",
            data: updatedShipment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
