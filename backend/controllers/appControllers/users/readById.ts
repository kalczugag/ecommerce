import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { UserModel } from "../../../models/User";

export const getUserById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid user ID format", 400));
    }

    try {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            return res
                .status(404)
                .json(errorResponse(null, "User not found", 404));
        }

        return res.status(200).json(successResponse(user));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
