import mongoose from "mongoose";
import { CategoryModel } from "./Categories";
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
    quantity: { type: Number, required: true },
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

productSchema.index({ sku: 1, brand: "text", title: "text" });

productSchema.pre("validate", async function (next) {
    const product = this;

    if (
        !product.isModified("topLevelCategory") &&
        !product.isModified("secondLevelCategory") &&
        !product.isModified("thirdLevelCategory")
    ) {
        return next();
    }

    const secondLevelCategory = await CategoryModel.findById(
        product.secondLevelCategory
    );
    if (
        !secondLevelCategory ||
        secondLevelCategory._parentCategory !== product.topLevelCategory
    ) {
        return next(
            new Error(
                "Second level category must belong to the top level category"
            )
        );
    }

    const thirdLevelCategory = await CategoryModel.findById(
        product.thirdLevelCategory
    );
    if (
        !thirdLevelCategory ||
        thirdLevelCategory._parentCategory !== product.secondLevelCategory
    ) {
        return next(
            new Error(
                "Third level category must belong to the second level category"
            )
        );
    }

    next();
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
