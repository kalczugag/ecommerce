import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";
import { CampaignsGlobalSummaryModel } from "../../../models/Analytics/CampaignsGlobalSummary";
import type { FeaturedCampaign } from "../../../types/FeaturedCampaign";

export const refreshCampaigns = async (
    req: express.Request<{}, {}, FeaturedCampaign>,
    res: express.Response
) => {
    try {
        const campaigns = await FeaturedCampaignModel.find({});
        const now = new Date();

        const summary = {
            active: 0,
            inactive: 0,
            scheduled: 0,
            completed: 0,
            total: 0,
        };

        const updatePromises = campaigns.map(async (campaign) => {
            let newStatus = campaign.status;

            if (campaign.endDate < now) {
                newStatus = "completed";
            } else if (campaign.startDate > now) {
                newStatus = "scheduled";
            } else if (campaign.startDate <= now && campaign.endDate >= now) {
                newStatus = "active";
            } else {
                newStatus = "inactive";
            }

            if (campaign.status !== newStatus) {
                campaign.status = newStatus;
                await campaign.save({ validateBeforeSave: false });
            }

            summary[newStatus]++;
            summary.total++;
        });

        await Promise.all(updatePromises);

        let refreshedCampaignsGlobalSummary =
            await CampaignsGlobalSummaryModel.findOneAndUpdate(
                {},
                { $set: summary },
                { new: true, upsert: true }
            );

        return res
            .status(201)
            .json(successResponse(summary, "Refreshed successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
