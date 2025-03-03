import mongoose from "mongoose";
import type { OrderNote } from "../../types/Order";

export type RefModels = "Order" | "Payment" | "Shipment" | "Return";

const noteSchema = new mongoose.Schema<OrderNote>(
    {
        text: { type: String, required: true },
        private: { type: Boolean, default: false, required: false },
        belongsTo: {
            _entity: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: "belongsTo.model",
            },
            model: {
                type: String,
                required: true,
                enum: ["Order", "Payment", "Shipment", "Return"],
            },
        },
    },
    { timestamps: true }
);

export const NoteModel = mongoose.model("Note", noteSchema);

//example usage to get belongsTo
// const notes = await NoteModel.find().populate("belongsTo.entityId");
