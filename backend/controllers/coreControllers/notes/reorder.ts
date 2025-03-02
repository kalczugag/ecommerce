import express from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import type { OrderNote, UpdateOrderNote } from "../../../types/Order";

export const reorderNotes = async (
    req: express.Request<{ id: string }, {}, UpdateOrderNote>,
    res: express.Response
) => {
    const { id } = req.params; // note id
    const { newIndex, belongsTo } = req.body;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid order ID format", 400));
    }

    if (!Number.isInteger(newIndex) || newIndex < 0) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid new index", 400));
    }

    if (!isValidObjectId(belongsTo._entity)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid entity ID format", 400));
    }

    if (!belongsTo.model) {
        return res.status(400).json(errorResponse(null, "Invalid model", 400));
    }

    try {
        const model = mongoose.model(belongsTo.model);

        const entity = await model
            .findById(belongsTo._entity)
            .populate("notes")
            .exec();

        if (!entity) {
            return res
                .status(404)
                .json(errorResponse(null, "Entity not found", 404));
        }

        const noteIndex = entity.notes.findIndex(
            (note: OrderNote) => note._id?.toString() == id
        );

        if (noteIndex === -1) {
            return res
                .status(404)
                .json(errorResponse(null, "Note not found", 404));
        }

        const [note] = entity.notes.splice(noteIndex, 1);

        entity.notes.splice(newIndex, 0, note);

        await entity.save();

        return res
            .status(201)
            .json(successResponse(null, "Notes reordered successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
