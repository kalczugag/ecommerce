import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";
import { MongooseQueryParser } from "mongoose-query-parser";
import type { User } from "../../../types/User";
import type { PaginatedCampaigns } from "../../../types/FeaturedCampaign";

const parser = new MongooseQueryParser();

export const getAllCampaigns = async (
    req: express.Request<{}, {}, {}, PaginatedCampaigns>,
    res: express.Response
) => {
    const user = req.user as User;
    const { search, ...rest } = req.query;
    const parsedQuery = parser.parse(rest);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const campaigns = await FeaturedCampaignModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .lean()
            .exec();

        const totalDocuments = await FeaturedCampaignModel.countDocuments(
            parsedQuery.filter
        );

        if (!campaigns || campaigns.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No campaigns found", 404));
        }

        return res
            .status(200)
            .json(successResponse(campaigns, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
