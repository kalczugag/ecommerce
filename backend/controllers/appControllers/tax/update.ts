import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { TaxModel } from "../../../models/Tax";
import type { Tax } from "../../../types/Tax";

export const updateTax = async (
    req: express.Request<{ id: string }, {}, Partial<Tax>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid tax ID format", 400));
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const updatedTax = await TaxModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedTax) {
            return res
                .status(404)
                .json(errorResponse(null, "Tax not found", 404));
        }

        return res.status(200).json(successResponse(updatedTax));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
