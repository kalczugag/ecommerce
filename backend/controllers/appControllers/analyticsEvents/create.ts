import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { EventModel } from "../../../models/Analytics/Event";

export const createEvent = async (
    req: express.Request<{}, {}, any>,
    res: express.Response
) => {
    const event = req.body[0];

    const { error } = schema.validate(event);

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
        const newDeliveryMethod = new EventModel(event);
        await newDeliveryMethod.save();

        return res.status(201).json(successResponse());
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
