import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductDailySummaryModel } from "../../../models/Analytics/ProductDailySummary";
import type { DailySummaryQueryParams } from "../../../types/Analytics";

export const getProductDailySummary = async (
    req: express.Request<{}, {}, {}, DailySummaryQueryParams>,
    res: express.Response
) => {
    const { date, all, today, last30Days } = req.query;

    try {
        let query;

        if (all) {
            query = ProductDailySummaryModel.find();
        } else if (last30Days) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);

            query = ProductDailySummaryModel.find({
                date: { $gte: startDate, $lt: endDate },
            }).sort({ date: -1 });
        } else {
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

            query = ProductDailySummaryModel.findOne({
                date: { $gte: startOfDay, $lt: endOfDay },
            });
        }

        const result = await query.exec();

        if (!result) {
            return res
                .status(404)
                .json(
                    errorResponse(
                        null,
                        "Product daily summary not found for this day",
                        404
                    )
                );
        }

        return res.status(201).json(successResponse(result));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
