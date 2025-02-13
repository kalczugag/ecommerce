import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { UserModel } from "../../../models/User";
import { User } from "../../../types/User";

//only role update for now
export const updateUser = async (
    req: express.Request<{ id: string }, {}, Partial<User>>,
    res: express.Response
) => {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid user ID format", 400));
    }

    try {
        // if (!role) {
        //     return res.status(404).json({ error: "Role not found" });
        // }

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!updatedUser) {
            return res
                .status(404)
                .json(errorResponse(null, "User not found", 404));
        }

        return res
            .status(200)
            .json(successResponse(updatedUser, "User updated successfully"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
