import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReturnModel } from "../../../models/Order/Return";
import type { ReturnOrder } from "../../../types/Order";

export const updateReturn = async (
    req: express.Request<{ id: string }, {}, Partial<ReturnOrder>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid return ID format", 400));
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const updatedReturn = await ReturnModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedReturn) {
            return res
                .status(404)
                .json(errorResponse(null, "Return not found", 404));
        }

        return res
            .status(200)
            .json(
                successResponse(updatedReturn, "Return updated successfully")
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
