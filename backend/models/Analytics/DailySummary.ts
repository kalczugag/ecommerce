import mongoose from "mongoose";
import type { DailySummary } from "../../types/Analytics";

const DailySummarySchema = new mongoose.Schema<DailySummary>({
    date: { type: Date, required: true, default: () => new Date() },
    pageViews: { type: Number, default: 0 },
    sessions: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    uniqueUsers: { type: Number, default: 0 },
});

DailySummarySchema.index({ date: 1 });

export const DailySummaryModel = mongoose.model(
    "DailySummary",
    DailySummarySchema
);
