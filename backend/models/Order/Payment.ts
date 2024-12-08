import mongoose from "mongoose";
import type { Payment } from "../../types/Order";

const paymentSchema = new mongoose.Schema<Payment>(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: [
                "credit_card",
                "paypal",
                "bank_transfer",
                "cash_on_delivery",
            ],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        amount: { type: Number, required: true },
        transactionId: { type: String, required: false },
        paymentDate: { type: Date, required: false },
    },
    { timestamps: true }
);

export const PaymentModel = mongoose.model("Payment", paymentSchema);
