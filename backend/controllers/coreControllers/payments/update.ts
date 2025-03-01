import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { PaymentModel } from "../../../models/Order/Payment";
import { NoteModel } from "../../../models/Order/Notes";
import type { Payment } from "../../../types/Order";

export const updatePayment = async (
    req: express.Request<{ id: string }, {}, Partial<Payment>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid payment ID format", 400));
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        if (updates.notes && updates.notes.length > 0) {
            const paymentNotes = await NoteModel.insertMany(updates.notes);

            updates.notes = paymentNotes.map((note) => note._id.toString());
        }

        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
            }
        );

        if (!updatedPayment) {
            return res
                .status(404)
                .json(errorResponse(null, "Payment not found", 404));
        }

        return res
            .status(200)
            .json(
                successResponse(updatePayment, "Payment updated successfully")
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
