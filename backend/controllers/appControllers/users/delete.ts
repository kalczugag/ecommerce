import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { UserModel } from "../../../models/User";

export const deleteUser = async (
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
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res
                .status(404)
                .json(errorResponse(null, "User not found", 404));
        }

        return res.json(successResponse(deletedUser));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
