import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CampaignsDailySummaryModel } from "../../../models/Analytics/CampaignDailySummary";
import { redisClient } from "../../../config/redis";

export const getCampaignsDailySummary = async (
    req: express.Request,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    try {
        const campaignsSummary = await CampaignsDailySummaryModel.find({});

        // await redisClient.set(cacheKey, JSON.stringify(campaignsSummary), "EX", 300);

        return res.status(201).json(successResponse(campaignsSummary));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
