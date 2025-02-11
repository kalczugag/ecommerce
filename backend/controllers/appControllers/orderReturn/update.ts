import express from "express";
import { isValidObjectId } from "mongoose";
import { ReturnModel } from "../../../models/Order/Return";
import type { ReturnOrder } from "../../../types/Order";

export const updateReturn = async (
    req: express.Request<{ id: string }, {}, Partial<ReturnOrder>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid return ID format" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        const updatedReturn = await ReturnModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedReturn) {
            return res.status(404).json({ error: "Return not found" });
        }

        return res.status(200).json({
            msg: "Return updated successfully",
            data: updatedReturn,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
