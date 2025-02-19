import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { SummaryModel } from "../../../models/Summary";

export const getSummary = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const summary = await SummaryModel.findOne();

        if (!summary) {
            return res
                .status(404)
                .json(errorResponse(null, "Summary not found"));
        }

        return res.status(200).json(successResponse(summary));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
