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
        const camapigns = await FeaturedCampaignModel.find({});

        const filteredCampaigns = camapigns.reduce(
            (acc, campaign) => {
                if (campaign.status === "active") {
                    acc.active += 1;
                } else if (campaign.status === "inactive") {
                    acc.inactive += 1;
                } else if (campaign.status === "scheduled") {
                    acc.scheduled += 1;
                } else if (campaign.status === "completed") {
                    acc.completed += 1;
                }

                acc.total++;

                return acc;
            },
            {
                active: 0,
                inactive: 0,
                scheduled: 0,
                completed: 0,
                total: 0,
            }
        );

        const newCampaignSummary = new CampaignsGlobalSummaryModel(
            filteredCampaigns
        );
        await newCampaignSummary.save();

        return res
            .status(201)
            .json(
                successResponse(
                    filteredCampaigns,
                    "Refreshed successfully",
                    201
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
