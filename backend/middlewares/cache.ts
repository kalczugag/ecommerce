import express from "express";
import crypto from "crypto";
import { redisClient } from "../config/redis";

export const cache =
    (cacheKeyPrefix: string) =>
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let queryParams =
                req.query && Object.keys(req.query).length > 0
                    ? JSON.stringify(req.query)
                    : null;

            const queryHash = queryParams
                ? crypto.createHash("md5").update(queryParams).digest("hex")
                : "no-query";

            const cacheKey = `${cacheKeyPrefix}:${queryHash}`;

            const cachedData = await redisClient.get(cacheKey);

            if (cachedData) {
                console.log(`Cache hit for ${cacheKey}`);
                return res.status(200).json(JSON.parse(cachedData));
            }

            console.log(`Cache miss for ${cacheKey}`);
            res.locals.cacheKey = cacheKey;
            next();
        } catch (error) {
            console.error("Error in cache middleware", error);
            next(error);
        }
    };
