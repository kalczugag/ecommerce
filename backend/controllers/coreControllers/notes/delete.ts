import express from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { NoteModel } from "../../../models/Order/Notes";

export const deleteNote = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid note ID format", 400));
    }

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res
                .status(404)
                .json(errorResponse(null, "Note not found", 404));
        }

        const model = mongoose.model(deletedNote.belongsTo.model);

        await model.updateOne(
            { _id: deletedNote.belongsTo._entity },
            { $pull: { notes: deletedNote._id } }
        );

        return res.json(successResponse(null, "Note deleted"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
