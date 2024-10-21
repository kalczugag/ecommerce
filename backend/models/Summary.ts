import mongoose from "mongoose";
import { Summary } from "../types/Summary";

const SummarySchema = new mongoose.Schema<Summary>(
    {
        orders: {
            total: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            itemsCount: { type: Number, default: 0 },
            thisWeek: { type: Number, default: 0 },
            lastWeek: { type: Number, default: 0 },
            thisMonth: { type: Number, default: 0 },
            lastMonth: { type: Number, default: 0 },
            thisYear: { type: Number, default: 0 },
            lastYear: { type: Number, default: 0 },
        },
        users: {
            count: { type: Number, default: 0 },
            thisWeek: { type: Number, default: 0 },
            lastWeek: { type: Number, default: 0 },
            thisMonth: { type: Number, default: 0 },
            lastMonth: { type: Number, default: 0 },
            thisYear: { type: Number, default: 0 },
            lastYear: { type: Number, default: 0 },
        },
        visitors: {
            total: { type: Number, default: 0 },
            loggedIn: { type: Number, default: 0 },
            anonymous: { type: Number, default: 0 },
            thisWeek: { type: Number, default: 0 },
            lastWeek: { type: Number, default: 0 },
            thisMonth: { type: Number, default: 0 },
            lastMonth: { type: Number, default: 0 },
            thisYear: { type: Number, default: 0 },
            lastYear: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

export const SummaryModel = mongoose.model("Summary", SummarySchema);
