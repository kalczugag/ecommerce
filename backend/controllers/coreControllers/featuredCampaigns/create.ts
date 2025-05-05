import express from "express";
import { nanoid } from "nanoid";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";
import type { FeaturedCampaign } from "../../../types/FeaturedCampaign";

export const createCampaign = async (
    req: express.Request<{}, {}, FeaturedCampaign>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    try {
        if (!req.body.promoCode) req.body.promoCode = nanoid(8).toUpperCase();

        const newCampaign = new FeaturedCampaignModel(req.body);
        await newCampaign.save();

        return res
            .status(201)
            .json(
                successResponse(req.body, "Campaign added successfully", 201)
            );
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            if (error.message.includes("duplicate key")) {
                return res
                    .status(409)
                    .json(errorResponse(null, "Campaign already exists", 409));
            }
        }
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
