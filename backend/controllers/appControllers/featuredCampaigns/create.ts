import express from "express";
import schema from "./schemaValidate";
import { FeaturedCampaignModel } from "../../../models/FeaturedCampaign";
import type { FeaturedCampaign } from "../../../types/FeaturedCampaign";

export const createCampaign = async (
    req: express.Request<{}, {}, FeaturedCampaign>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message),
        });
    }

    try {
        const newCampaign = new FeaturedCampaignModel(req.body);

        await newCampaign.save();

        return res.status(201).json({
            msg: "Campaign added successfully",
            data: newCampaign,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            if (error.message.includes("duplicate key")) {
                return res
                    .status(409)
                    .json({ error: "Campaign with this name already exists" });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};
