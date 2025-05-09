import mongoose from "mongoose";
import { ReturnOrder } from "../../types/Order";

const returnSchema = new mongoose.Schema<ReturnOrder>(
    {
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        returnedItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BaseItem",
                required: true,
            },
        ],
        returnReason: { type: String, required: true },
        returnStatus: {
            type: String,
            enum: ["initiated", "approved", "rejected", "completed"],
            default: "initiated",
        },
        refundAmount: { type: Number, required: true },
        refundMethod: {
            type: String,
            enum: ["credit_card", "paypal", "bank_transfer"],
            required: true,
        },
        _deliveryMethod: {
            type: mongoose.Types.ObjectId,
            ref: "DeliveryMethod",
            required: false,
        },
        refundPayments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment",
                required: true,
            },
        ],
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

export const ReturnModel = mongoose.model("Return", returnSchema);
