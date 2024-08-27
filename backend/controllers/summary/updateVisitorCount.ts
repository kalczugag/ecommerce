import express from "express";
import { SummaryModel } from "@/models/Summary";
import {
    getStartOfThisWeek,
    getStartOfThisMonth,
    getStartOfThisYear,
} from "@/utlis/helpers";

export const updateVisitorCount = async (
    req: express.Request<{}, {}, { isLoggedIn: boolean }>,
    res: express.Response
) => {
    const { isLoggedIn } = req.body;

    const now = new Date();
    const startOfWeek = getStartOfThisWeek();
    const startOfMonth = getStartOfThisMonth();
    const startOfYear = getStartOfThisYear();

    try {
        const summary = await SummaryModel.findOneAndUpdate(
            {},
            {},
            { upsert: true, new: true }
        );

        summary.visitors.total += 1;

        if (isLoggedIn) {
            summary.visitors.loggedIn += 1;
        } else {
            summary.visitors.anonymous += 1;
        }

        if (now >= startOfWeek) {
            summary.visitors.thisWeek += 1;
            summary.users.thisWeek += 1;
        }

        if (now >= startOfMonth) {
            summary.visitors.thisMonth += 1;
            summary.users.thisMonth += 1;
        }

        if (now >= startOfYear) {
            summary.visitors.thisYear += 1;
            summary.users.thisYear += 1;
        }

        await summary.save();

        return res.status(200).json({ msg: "Visitor count updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
