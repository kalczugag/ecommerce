import mongoose from "mongoose";
import type { Tax } from "../types/Tax";

const taxSchema = new mongoose.Schema<Tax>({
    region: { type: String, required: true },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    taxPercent: { type: Number, required: true },
});

taxSchema.index({ region: 1 }, { unique: true });
taxSchema.index({ region: "text", category: "text" });

export const TaxModel = mongoose.model("Tax", taxSchema);
