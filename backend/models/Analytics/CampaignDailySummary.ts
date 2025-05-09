import mongoose from "mongoose";
import type { CampaignsDailySummary } from "../../types/Analytics";

const CampaignsDailySummarySchema = new mongoose.Schema<CampaignsDailySummary>({
    date: { type: Date, required: true, default: () => new Date() },
    _campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    views: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    inactive: { type: Number, default: 0 },
    scheduled: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
});

CampaignsDailySummarySchema.index({ date: 1 });

export const CampaignsDailySummaryModel = mongoose.model(
    "CampaignsDailySummary",
    CampaignsDailySummarySchema
);
