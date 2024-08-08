import mongoose from "mongoose";
import type { Product } from "@/types/Product";

const productSchema = new mongoose.Schema<Product>({
    imageUrl: { type: String, required: true },
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
    topLevelCategory: { type: String, required: true },
    secondLevelCategory: { type: String, required: true },
    thirdLevelCategory: { type: String, required: true },
    description: { type: String },
});

export const ProductModel = mongoose.model("Product", productSchema);
