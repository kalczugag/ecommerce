import mongoose from "mongoose";
import type { FeaturedCampaign } from "../types/FeaturedCampaign";

const featuredCampaignSchema = new mongoose.Schema<FeaturedCampaign>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    imageUrl: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promoCode: { type: String, required: false },
    image: { type: String, required: false },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    status: { type: String, required: true, default: "active" },
    textColor: {
        primary: { type: String, default: "#000000" },
        secondary: { type: String, default: "#ffffff" },
    },
    bgColor: {
        primary: { type: String, default: "#ffffff" },
        secondary: { type: String, default: "#000000" },
    },
});

export const FeaturedCampaignModel = mongoose.model(
    "FeaturedCampaign",
    featuredCampaignSchema
);
