import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";
import { redisClient } from "../../../config/redis";

export const getAllDeliveryMethods = async (
    req: express.Request,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    try {
        const deliveryMethods = await DeliveryMethodModel.find();

        if (!deliveryMethods || deliveryMethods.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No delivery methods found", 404));
        }

        await redisClient.set(
            cacheKey,
            JSON.stringify(deliveryMethods),
            "EX",
            3600 * 24 * 7
        );

        return res.status(200).json(successResponse(deliveryMethods));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
