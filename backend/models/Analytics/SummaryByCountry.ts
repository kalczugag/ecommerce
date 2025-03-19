import mongoose from "mongoose";
import type { SummaryByCountry } from "../../types/Analytics";

const SummaryByCountry = new mongoose.Schema<SummaryByCountry>({
    country: { type: String, required: true, unique: true },
    flag: { type: String, required: true },
    count: { type: Number, default: 1 },
});

SummaryByCountry.index({ country: 1 });

export const SummaryByCountryModel = mongoose.model(
    "SummaryByCountry",
    SummaryByCountry
);
