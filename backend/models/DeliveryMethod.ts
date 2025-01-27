import mongoose from "mongoose";
import type { DeliveryMethod, Provider } from "../types/DeliveryMethod";

const providerSchema = new mongoose.Schema<Provider>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedDeliveryTimeMin: {
        type: Number,
        required: true,
    },
    estimatedDeliveryTimeMax: {
        type: Number,
        required: true,
    },
    additionalNotes: { type: mongoose.Schema.Types.Mixed },
    isAvailable: { type: Boolean, default: true },
});

const deliveryMethodSchema = new mongoose.Schema<DeliveryMethod>({
    type: {
        type: String,
        required: true,
        enum: ["home_delivery", "locker_delivery", "pickup"],
    },
    providers: [providerSchema],
    metadata: { type: mongoose.Schema.Types.Mixed },
});

export const DeliveryMethodModel = mongoose.model(
    "DeliveryMethod",
    deliveryMethodSchema
);
