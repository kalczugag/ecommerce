import mongoose from "mongoose";
import type { Product } from "../types/Product";

const productSchema = new mongoose.Schema<Product>({
    sku: { type: String, required: true, unique: true },
    imageUrl: { type: [String], required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    discountedPrice: { type: Number },
    price: { type: Number, required: true },
    discountPercent: { type: Number },
    size: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    quantity: { type: Number, required: false, default: 0 },
    analytics: {
        average: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
        recentReviews: { type: mongoose.Schema.ObjectId, ref: "Review" },
    },
    topLevelCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    secondLevelCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    thirdLevelCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    description: { type: String },
});

productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({
    sku: "text",
    brand: "text",
    title: "text",
    color: "text",
    description: "text",
});

productSchema.pre("save", function (next) {
    if (this.discountPercent && this.price) {
        this.discountedPrice =
            this.price - (this.price * this.discountPercent) / 100;
    } else {
        this.discountedPrice = this.price;
    }

    if (this.size && Array.isArray(this.size)) {
        this.quantity = this.size.reduce((total, sizeItem) => {
            return total + (sizeItem.quantity || 0);
        }, 0);
    }

    next();
});

productSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate() as any;

    if (update.discountPercent && update.price) {
        update.discountedPrice =
            update.price - (update.price * update.discountPercent) / 100;
    }

    if (update.size && Array.isArray(update.size)) {
        update.quantity = update.size.reduce(
            (total: number, sizeItem: { quantity: number }) => {
                return total + (sizeItem.quantity || 0);
            },
            0
        );
    }

    next();
});

export const ProductModel = mongoose.model("Product", productSchema);
