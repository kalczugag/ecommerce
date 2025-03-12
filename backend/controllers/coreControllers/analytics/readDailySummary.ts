import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DailySummaryModel } from "../../../models/Analytics/DailySummary";
import type { DailySummaryQueryParams } from "../../../types/Analytics";

export const getDailySummary = async (
    req: express.Request<{}, {}, {}, DailySummaryQueryParams>,
    res: express.Response
) => {
    const { date, all, today } = req.query;

    try {
        let query;

        if (all) {
            query = DailySummaryModel.find();
        } else {
            if (!date && !today) {
                return res
                    .status(400)
                    .json(errorResponse(null, "Date is required", 400));
            }

            const dateObject = today ? new Date() : new Date(date!);

            query = DailySummaryModel.findOne({
                date: dateObject,
            });
        }

        const result = await query.exec();

        if (!result) {
            return res
                .status(404)
                .json(errorResponse(null, "Daily summary not found", 404));
        }

        return res.status(201).json(successResponse(result));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
