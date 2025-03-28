import express from "express";
import schema from "./schemaValidate";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReviewModel } from "../../../models/Review";
import type { AddReview } from "../../../types/Review";
import type { User } from "../../../types/User";

export const createReview = async (
    req: express.Request<{}, {}, AddReview>,
    res: express.Response
) => {
    const user = req.user as User;
    const reviewData = { ...req.body, _user: user._id };

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
        const newReview = new ReviewModel(reviewData);

        await newReview.save();

        return res
            .status(201)
            .json(successResponse(newReview, "Review added successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
