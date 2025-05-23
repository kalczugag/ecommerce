import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";

export const deleteCampaign = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid campaign ID format", 400));
    }

    try {
        const deletedCampaign = await FeaturedCampaignModel.findByIdAndDelete(
            id
        );

        if (!deletedCampaign) {
            return res
                .status(404)
                .json(errorResponse(null, "Campaign not found", 404));
        }

        return res.json(successResponse(deleteCampaign, "Campaign deleted"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
