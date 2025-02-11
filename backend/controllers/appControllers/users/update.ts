import express from "express";
import { UserModel } from "../../../models/User";
import { User } from "../../../types/User";
import { isValidObjectId } from "mongoose";

//only role update for now
export const updateUser = async (
    req: express.Request<{ id: string }, {}, Partial<User>>,
    res: express.Response
) => {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    try {
        // if (!role) {
        //     return res.status(404).json({ error: "Role not found" });
        // }

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res
            .status(200)
            .json({ msg: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
