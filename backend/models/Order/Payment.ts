import mongoose from "mongoose";
import type { Payment } from "../../types/Order";

const paymentSchema = new mongoose.Schema<Payment>(
    {
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        card: {
            brand: String,
            last4: String,
            exp_month: Number,
            exp_year: Number,
            funding: String,
            country: String,
            checks: {
                cvc_check: String,
                address_line1_check: String,
                address_postal_code_check: String,
            },
        },
        amount: { type: Number, required: true },
        transactionId: { type: String, required: false },
        paymentDate: { type: Date, required: false },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note",
                required: false,
            },
        ],
        authorized: { type: Boolean, default: false, required: false },
        voided: { type: Boolean, default: false, required: false },
        capturedAmount: { type: Number, required: false },
        authorizationStatus: {
            type: String,
            enum: ["open", "closed"],
            default: "open",
        },
        allowAdditionalCapture: { type: Boolean, required: false },
    },
    { timestamps: true }
);

export const PaymentModel = mongoose.model("Payment", paymentSchema);
