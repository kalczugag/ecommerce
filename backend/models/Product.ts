import mongoose from "mongoose";
import { CategoryModel } from "./Categories";
import type { Product } from "../types/Product";

const productSchema = new mongoose.Schema<Product>({
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

productSchema.pre("validate", async function (next) {
    const product = this;

    const secondLevelCategory = await CategoryModel.findById(
        product.secondLevelCategory
    );
    if (
        !secondLevelCategory ||
        secondLevelCategory.parentCategory !== product.topLevelCategory
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
        thirdLevelCategory.parentCategory !== product.secondLevelCategory
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

    next();
});

export const ProductModel = mongoose.model("Product", productSchema);
