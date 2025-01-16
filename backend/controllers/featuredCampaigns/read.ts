import express from "express";
import { FeaturedCampaignModel } from "../../models/FeaturedCampaign";
import { CategoryModel } from "../../models/Categories";
import { MongooseQueryParser } from "mongoose-query-parser";
import type { User } from "../../types/User";

const parser = new MongooseQueryParser();

export const getAllCampaigns = async (
    req: express.Request,
    res: express.Response
) => {
    const user = req.user ? (req.user as User) : null;
    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        let userPreferenceCategory: any;

        if (user && user.preferences !== "all")
            userPreferenceCategory = await CategoryModel.findOne({
                name: new RegExp(user.preferences, "i"),
            });

        const preferences = userPreferenceCategory
            ? { category: userPreferenceCategory._id }
            : {};
        const combined = { ...parsedQuery.filter, ...preferences };

        const campaigns = await FeaturedCampaignModel.find(combined)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await FeaturedCampaignModel.countDocuments(
            parsedQuery.filter
        );

        if (!campaigns || campaigns.length === 0) {
            return res
                .status(404)
                .json({ error: "No campaigns found for your preferences" });
        }

        const hasMore = (page + 1) * pageSize < totalDocuments;

        return res
            .status(200)
            .json({
                data: campaigns,
                count: totalDocuments,
                hasMore,
                nextCursor: page + 1,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
