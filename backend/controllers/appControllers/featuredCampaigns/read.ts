import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";
import { CategoryModel } from "../../../models/Categories";
import { MongooseQueryParser } from "mongoose-query-parser";
import type { User } from "../../../types/User";
import { WishlistModel } from "../../../models/Wishlist";

const parser = new MongooseQueryParser();

export const getAllCampaigns = async (
    req: express.Request,
    res: express.Response
) => {
    const user = req.user ? (req.user as User) : null;
    const { favorite, ...rest } = req.query;
    const parsedQuery = parser.parse(rest);

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

        let campaigns = await FeaturedCampaignModel.find(combined)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .lean()
            .exec();

        console.log(user);

        if (user) {
            const wishlist = await WishlistModel.findById(user._wishlist, {
                products: 1,
            });
            const wishlistedSet = new Set(
                wishlist?.products?.map((p) => p.toString())
            );

            campaigns = campaigns.map((prod) => ({
                ...(prod ?? prod),
                isFavorite: wishlistedSet.has(prod._id.toString()),
            }));
        }

        const totalDocuments = await FeaturedCampaignModel.countDocuments(
            parsedQuery.filter
        );

        if (!campaigns || campaigns.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No campaigns found", 404));
        }

        const hasMore = (page + 1) * pageSize < totalDocuments;

        return res
            .status(200)
            .json(
                successResponse(
                    campaigns,
                    "OK",
                    200,
                    totalDocuments,
                    hasMore,
                    page + 1
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
