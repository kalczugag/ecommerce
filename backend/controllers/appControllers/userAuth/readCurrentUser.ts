import express from "express";
import { errorResponse } from "../../../handlers/apiResponse";
import { User } from "../../../types/User";
import { redisClient } from "../../../config/redis";

export const getCurrentUser = async (
    req: express.Request,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    const user = req.user as User;

    try {
        await redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
