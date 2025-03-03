import mongoose from "mongoose";
import type { Shipment } from "../../types/Order";

const shipmentSchema = new mongoose.Schema<Shipment>(
    {
        _order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BaseItem",
                required: true,
            },
        ],
        shipFrom: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        shipTo: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        status: {
            type: String,
            enum: [
                "pending",
                "shipped",
                "delivered",
                "returned",
                "failed",
                "canceled",
            ],
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
        _parentShipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shipment",
            required: false,
        },
        splitShipments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shipment",
                required: false,
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

export const ShipmentModel = mongoose.model("Shipment", shipmentSchema);
