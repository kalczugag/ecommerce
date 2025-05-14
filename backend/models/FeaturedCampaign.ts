import mongoose from "mongoose";
import type { FeaturedCampaign } from "../types/FeaturedCampaign";

const featuredCampaignSchema = new mongoose.Schema<FeaturedCampaign>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, maxlength: 500 },
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    imageUrl: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discount: { type: Number, required: true, min: 0, max: 100, default: 0 },
    promoCode: { type: String, required: false },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
        },
    ],
    status: { type: String, required: true, default: "active" },
    textColor: {
        primary: { type: String, default: "#000000" },
        secondary: { type: String, default: "#ffffff" },
    },
    bgColor: {
        primary: { type: String, default: "#EFEFF0" },
        secondary: { type: String, default: "#ffffff" },
    },
    hidden: { type: Boolean, required: false, default: false },
});

featuredCampaignSchema.index({ promoCode: 1 }, { unique: true });
featuredCampaignSchema.index({
    name: "text",
    description: "text",
    promoCode: "text",
});

export const FeaturedCampaignModel = mongoose.model(
    "FeaturedCampaign",
    featuredCampaignSchema
);
