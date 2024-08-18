import mongoose from "mongoose";
import type { Order } from "@/types/Order";

const itemSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const addressSchema = new mongoose.Schema(
    {
        street: { type: String, required: false },
        apartment: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema<Order>(
    {
        _user: { type: String, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        status: { type: String, required: false, default: "pending" },
        total: { type: Number, required: true },
        address: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, required: false, default: "pending" },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
