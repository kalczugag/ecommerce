import mongoose from "mongoose";
import type { OrderNote } from "../../types/Order";

const noteSchema = new mongoose.Schema<OrderNote>(
    {
        text: { type: String, required: true },
        private: { type: Boolean, default: false, required: false },
    },
    { timestamps: true }
);

export const NoteModel = mongoose.model("Note", noteSchema);
