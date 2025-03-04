import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { EventModel } from "../../../models/Analytics/Event";
import type { Event } from "../../../types/Analytics";
import { Document } from "mongoose";

export const createEvent = async (
    req: express.Request<{}, {}, Event & Document>,
    res: express.Response
) => {
    const sessionId = req.sessionID || (req.headers["x-session-id"] as string);

    if (!sessionId) {
        return res
            .status(400)
            .json(errorResponse(null, "Session ID is required", 400));
    }

    // const { error } = schema.validate(req.body);

    // if (error) {
    //     return res
    //         .status(400)
    //         .json(
    //             errorResponse(
    //                 null,
    //                 error.details.map((detail) => detail.message).join(", "),
    //                 400
    //             )
    //         );
    // }

    try {
        console.log({ ...req.body, _session: sessionId });
        // const newDeliveryMethod = new EventModel({
        //     ...req.body,
        //     _session: sessionId,
        // });

        // await newDeliveryMethod.save();

        return res.status(201).json(successResponse());
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
