import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CampaignsGlobalSummaryModel } from "../../../models/Analytics/CampaignsGlobalSummary";
import { redisClient } from "../../../config/redis";

export const getCampaignsGlobalSummary = async (
    req: express.Request,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    try {
        const campaignsSummary = await CampaignsGlobalSummaryModel.findOne({});

        // await redisClient.set(cacheKey, JSON.stringify(campaignsSummary), "EX", 300);

        return res.status(201).json(successResponse(campaignsSummary));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
