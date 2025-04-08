import mongoose from "mongoose";
import { ProductModel } from "./Product";
import { OrderModel } from "./Order";
import type { Review } from "../types/Review";
import { BaseItemModel } from "./BaseItem";

const reviewSchema = new mongoose.Schema<Review>(
    {
        _product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        value: { type: Number, required: true, min: 0.5, max: 5 },
        pros: { type: [String], required: false },
        cons: { type: [String], required: false },
        message: { type: String, required: false, maxlength: 500 },
    },
    { timestamps: true }
);

reviewSchema.pre("validate", async function (next) {
    const isReviewed = await BaseItemModel.exists({
        _product: this._product,
        reviewed: true,
    });

    if (isReviewed) {
        return next(new Error("Product already reviewed"));
    }

    const productExists = await ProductModel.exists({ _id: this._product });

    if (!productExists) {
        return next(new Error("Invalid product: Product does not exist."));
    }

    const orderExists = await OrderModel.exists({ _id: this._order });

    if (!orderExists) {
        return next(new Error("Invalid order: Order does not exist."));
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

    process.nextTick(async () => {
        await BaseItemModel.updateOne(
            { _product: doc._product },
            { $set: { reviewed: true } }
        );
    });
});

export const ReviewModel = mongoose.model("Review", reviewSchema);
