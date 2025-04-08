import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DailySummaryModel } from "../../../models/Analytics/DailySummary";
import type {
    DailySummary,
    DailySummaryQueryParams,
} from "../../../types/Analytics";
import { UserModel } from "../../../models/User";
import { SummaryByCountryModel } from "../../../models/Analytics/SummaryByCountry";
import { redisClient } from "../../../config/redis";

export const getDailySummary = async (
    req: express.Request<{}, {}, {}, DailySummaryQueryParams>,
    res: express.Response
) => {
    const { date, today, last30Days, last6Months, prev30Days, prev6Months } =
        req.query;

    const cacheKey = res.locals.cacheKey;

    try {
        let query;
        let last30DaysData: DailySummary[] = [];
        let last6MonthsData = [];
        let prev30DaysData: Record<string, number | Record<string, number>> =
            {};
        let prev6MonthsData: Record<string, number> = {};

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
        }

        if (prev30Days) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            endDate.setDate(endDate.getDate() - 60);

            const prev30Days = await DailySummaryModel.find({
                date: { $gte: startDate, $lt: endDate },
            });

            if (prev30Days.length === 0) {
                prev30DaysData = {
                    uniqueUsers: 0,
                    orders: 0,
                    earnings: 0,
                    sessions: {
                        direct: 0,
                        organic: 0,
                        referral: 0,
                    },
                };
            } else {
                prev30DaysData.uniqueUsers = prev30Days.reduce(
                    (acc, item) => acc + item.uniqueUsers,
                    0
                );
                prev30DaysData.orders = prev30Days.reduce(
                    (acc, item) => acc + item.orders,
                    0
                );
                prev30DaysData.earnings = prev30Days.reduce(
                    (acc, item) => acc + item.earnings,
                    0
                );
                prev30DaysData.sessions = {
                    direct: prev30Days.reduce(
                        (acc, item) => acc + item.sessions.direct,
                        0
                    ),
                    organic: prev30Days.reduce(
                        (acc, item) => acc + item.sessions.organic,
                        0
                    ),
                    referral: prev30Days.reduce(
                        (acc, item) => acc + item.sessions.referral,
                        0
                    ),
                };
            }
        }

        if (prev6Months) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getMonth());
            endDate.setDate(endDate.getMonth() - 6);

            const prev6Months = await DailySummaryModel.find({
                date: { $gte: startDate, $lt: endDate },
            });

            if (prev6Months.length === 0) {
                prev6MonthsData = {
                    pageViews: 0,
                };
            } else {
                prev6MonthsData.pageViews = prev6Months.reduce(
                    (acc, item) => acc + item.pageViews,
                    0
                );
            }
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

        const response = successResponse({
            todayOrDate: query || null,
            users,
            last30Days: last30DaysData,
            last6Months: last6MonthsData,
            prev30Days: prev30DaysData,
            prev6Months: prev6MonthsData,
        });

        await redisClient.set(cacheKey, JSON.stringify(response), "EX", 300);

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
