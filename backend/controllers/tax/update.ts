import express from "express";
import { isValidObjectId } from "mongoose";
import { TaxModel } from "../../models/Tax";
import type { Tax } from "../../types/Tax";

export const updateTax = async (
    req: express.Request<{ id: string }, {}, Tax>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid tax ID format" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        const updatedTax = await TaxModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedTax) {
            return res.status(404).json({ error: "Tax not found" });
        }

        return res.status(200).json(updatedTax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
