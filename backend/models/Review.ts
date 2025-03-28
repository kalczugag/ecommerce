import mongoose from "mongoose";
import { ProductModel } from "./Product";
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
        message: { type: String, required: true },
    },
    { timestamps: true }
);

reviewSchema.pre("validate", async function (next) {
    const productExists = await ProductModel.exists({ _id: this._product });

    if (!productExists) {
        return next(new Error("Invalid product: Product does not exist."));
    }

    next();
});

reviewSchema.post("save", async function (doc) {
    const stats = await ReviewModel.aggregate([
        { $match: { _product: doc._product } },
        {
            $group: {
                _id: "$_product",
                average: { $avg: "$value" },
                reviewCount: { $sum: 1 },
            },
        },
    ]);

    const { average = 0, reviewCount = 0 } = stats[0] || {};

    await ProductModel.bulkWrite([
        {
            updateOne: {
                filter: { _id: doc._product },
                update: {
                    "analytics.average": average,
                    "analytics.reviewCount": reviewCount,
                },
            },
        },
    ]);
});

export const ReviewModel = mongoose.model("Review", reviewSchema);
