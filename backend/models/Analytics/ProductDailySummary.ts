import mongoose from "mongoose";
import type { ProductDailySummary } from "../../types/Analytics";

const ProductDailySummarySchema = new mongoose.Schema<ProductDailySummary>({
    date: { type: Date, required: true, default: () => new Date() },
    _product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    views: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
});

ProductDailySummarySchema.index({ date: 1, _product: 1 });

export const ProductDailySummaryModel = mongoose.model(
    "DailySummary",
    ProductDailySummarySchema
);
