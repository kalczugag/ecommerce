import mongoose from "mongoose";
import type { Order } from "@/types/Order";

const itemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema<Order>(
    {
        _user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        status: { type: String, required: false, default: "pending" },
        total: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, required: false, default: "pending" },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
