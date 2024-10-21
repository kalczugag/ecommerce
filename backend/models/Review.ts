import mongoose from "mongoose";
import type { Review } from "../types/Review";

const reviewSchema = new mongoose.Schema<Review>(
    {
        _product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        value: { type: Number, required: true, min: 0.5, max: 5 },
        reviewMessage: { type: String, required: true },
    },
    { timestamps: true }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);
