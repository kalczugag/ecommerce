import mongoose from "mongoose";
import type { Item } from "../types/Order";

export const baseItemSchema = new mongoose.Schema<Item>({
    _product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: { type: String, required: true },
    sku: { type: String, required: false },
    color: { type: String, required: false },
    size: { type: String, required: false },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    total: { type: Number, required: false }, // unitPrice * quantity
});

baseItemSchema.pre("save", async function (next) {
    const item = this as Item;

    item.total = item.unitPrice * item.quantity;

    next();
});

export const BaseItemModel = mongoose.model("BaseItem", baseItemSchema);
