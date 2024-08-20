import mongoose from "mongoose";
import type { Order, Item } from "@/types/Order";

const itemSchema = new mongoose.Schema<Item>(
    {
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema<Order>(
    {
        _user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        status: { type: String, required: false, default: "placed" },
        total: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, required: false, default: "pending" },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
