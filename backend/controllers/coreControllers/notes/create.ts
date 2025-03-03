import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { NoteModel } from "../../../models/Order/Notes";
import type { OrderNote } from "../../../types/Order";
import mongoose from "mongoose";

export const createNote = async (
    req: express.Request<{}, {}, OrderNote>,
    res: express.Response
) => {
    const values = req.body;

    const { error } = schema.validate(values);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    try {
        const newNote = await NoteModel.create(values);

        if (!newNote) {
            return res
                .status(404)
                .json(errorResponse(null, "Cannot create a note", 404));
        }

        const model = mongoose.model(values.belongsTo.model);

        if (!model) {
            return res
                .status(400)
                .json(errorResponse(null, "Invalid target", 400));
        }

        await model.findByIdAndUpdate(values.belongsTo._entity, {
            $push: { notes: newNote._id },
        });

        return res
            .status(201)
            .json(
                successResponse(
                    newNote,
                    `Note created successfully for ${values.belongsTo.model}`,
                    201
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
