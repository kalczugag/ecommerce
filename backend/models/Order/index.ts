import mongoose from "mongoose";
import _ from "lodash";
import { CounterModel } from "../../models/Counter";
import type { Order, ShippingAddress } from "../../types/Order";

export const shippingAddressSchema = new mongoose.Schema<ShippingAddress>({
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false },
});

const orderSchema = new mongoose.Schema<Order>(
    {
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderNumber: { type: Number, unique: true },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BaseItem",
                required: true,
            },
        ],
        status: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "shipped",
                "delivered",
                "pending payment",
                "canceled",
                "returned",
            ],
            default: "placed",
        },
        shippingAddress: shippingAddressSchema,
        billingAddress: shippingAddressSchema,
        subTotal: { type: Number, required: true },
        tax: { type: Number, required: false, default: 0 },
        discount: { type: Number, required: true },
        total: { type: Number, required: true },
        payments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment",
                required: false,
            },
        ],
        shipments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shipment",
                required: false,
            },
        ],
        _parentOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: false,
        },
        splitOrders: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: false,
        },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note",
                required: false,
            },
        ],
    },
    { timestamps: true }
);

orderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
        try {
            const counter = await CounterModel.findByIdAndUpdate(
                { _id: "orderNumber" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            this.orderNumber = counter.seq;
        } catch (error: any) {
            return next(error);
        }
    }

    next();
});

export const OrderModel = mongoose.model("Order", orderSchema);
