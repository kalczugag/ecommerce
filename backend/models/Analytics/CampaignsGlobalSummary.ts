import mongoose from "mongoose";
import type { CampaignsGlobalSummary } from "../../types/Analytics";

const CampaignsGlobalSummarySchema =
    new mongoose.Schema<CampaignsGlobalSummary>(
        {
            views: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            active: { type: Number, default: 0 },
            inactive: { type: Number, default: 0 },
            scheduled: { type: Number, default: 0 },
            completed: { type: Number, default: 0 },
        },
        { timestamps: true }
    );

export const CampaignsGlobalSummaryModel = mongoose.model(
    "CampaignsGlobalSummary",
    CampaignsGlobalSummarySchema
);
