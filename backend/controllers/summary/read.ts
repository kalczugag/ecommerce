import express from "express";
import { SummaryModel } from "@/models/Summary";

export const getSummary = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const summary = await SummaryModel.findOne();

        if (!summary) {
            return res.status(404).json({ error: "No summary data found" });
        }

        return res.status(200).json(summary);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
