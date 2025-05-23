import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";

export const getCampaignById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Campaign ID is required", 400));
    }

    try {
        const campaign = await FeaturedCampaignModel.findById(id);

        if (!campaign) {
            res.status(400).json(
                errorResponse(null, "Campaign not found", 404)
            );
        }

        return res.status(200).json(successResponse(campaign));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
