import mongoose from "mongoose";
import type { Shipment } from "../../types/Order";

const shipmentSchema = new mongoose.Schema<Shipment>(
    {
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        shipFrom: {
            type: String,
            required: true,
        },
        shipTo: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending",
        },
        _deliveryMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryMethod",
            required: true,
        },
        itemsDelivered: {
            type: Number,
            default: 0,
            required: false,
        },
        actualDeliveryDate: {
            type: Date,
            required: false,
        },
        trackingNumber: {
            type: String,
            required: false,
        },
        shippingCost: {
            type: Number,
            required: true,
        },
        deliverySignature: {
            type: Boolean,
            required: false,
        },
        deliveryNotes: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export const ShipmentModel = mongoose.model("Shipment", shipmentSchema);
