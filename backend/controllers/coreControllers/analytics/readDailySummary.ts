import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DailySummaryModel } from "../../../models/Analytics/DailySummary";
import type {
    DailySummary,
    DailySummaryQueryParams,
} from "../../../types/Analytics";
import { UserModel } from "../../../models/User";
import { SummaryByCountryModel } from "../../../models/Analytics/SummaryByCountry";

export const getDailySummary = async (
    req: express.Request<{}, {}, {}, DailySummaryQueryParams>,
    res: express.Response
) => {
    const { date, today, last30Days, last6Months } = req.query;

    try {
        let query;
        let last30DaysData: DailySummary[] = [];
        let last6MonthsData = [];

        const users = await Promise.all([
            UserModel.countDocuments(),
            SummaryByCountryModel.find({}),
        ]).then(([total, byCountry]) => ({ total, byCountry }));

        if (last30Days) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);

            last30DaysData = await DailySummaryModel.find({
                date: { $gte: startDate, $lt: endDate },
            })
                .sort({ date: -1 })
                .lean();
        }

        if (last6Months) {
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

            last6MonthsData = await DailySummaryModel.aggregate([
                {
                    $match: {
                        date: { $gte: sixMonthsAgo },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                        },
                        pageViews: { $sum: "$pageViews" },
                    },
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        month: "$_id.month",
                        pageViews: 1,
                    },
                },
            ]);

            last6MonthsData = JSON.parse(JSON.stringify(last6MonthsData));
        }

        if (today || date) {
            if (!date && !today)
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            null,
                            "One of the parameters is required",
                            400
                        )
                    );

            const targetDate = new Date(
                today || !date ? new Date() : new Date(date)
            );
            const startOfDay = new Date(
                targetDate.getFullYear(),
                targetDate.getMonth(),
                targetDate.getDate()
            );
            const endOfDay = new Date(
                targetDate.getFullYear(),
                targetDate.getMonth(),
                targetDate.getDate() + 1
            );

            query = DailySummaryModel.findOne({
                date: { $gte: startOfDay, $lt: endOfDay },
            }).lean();
        }

        if (
            !query &&
            last30DaysData.length === 0 &&
            last6MonthsData.length === 0
        ) {
            return res
                .status(404)
                .json(errorResponse(null, "No data found", 404));
        }

        return res.status(201).json(
            successResponse({
                todayOrDate: query || null,
                users,
                last30Days: last30DaysData,
                last6Months: last6MonthsData,
            })
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
