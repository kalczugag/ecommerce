import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { PaymentModel } from "../../../models/Order/Payment";
import { NoteModel } from "../../../models/Order/Notes";
import type { Payment } from "../../../types/Order";

export const updatePayment = async (
    req: express.Request<{ id: string }, {}, Partial<Payment>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid order ID format" });
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        if (updates.paymentNotes && updates.paymentNotes.length > 0) {
            const paymentNotes = await NoteModel.insertMany(
                updates.paymentNotes
            );

            updates.paymentNotes = paymentNotes.map((note) =>
                note._id.toString()
            );
        }

        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
            }
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        return res.status(200).json({
            msg: "Payment updated successfully",
            data: updatedPayment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
