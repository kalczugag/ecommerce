import mongoose from "mongoose";
import type { Item } from "../../types/Order";

const orderItemSchema = new mongoose.Schema<Item>(
    {
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        _product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        color: { type: String, required: false },
        size: { type: String, required: false },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        total: { type: Number, required: true }, // unitPrice * quantity
    },
    { timestamps: true }
);

export const OrderItemModel = mongoose.model("OrderItem", orderItemSchema);
