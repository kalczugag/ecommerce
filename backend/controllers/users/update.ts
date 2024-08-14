import express from "express";
import { RoleModel } from "@/models/Role";
import { UserModel } from "@/models/User";
import { User } from "@/types/User";
import { isValidObjectId } from "mongoose";

//only role update for now
export const updateUser = async (
    req: express.Request<{ userId: string }, {}, User>,
    res: express.Response
) => {
    const { userId } = req.params;
    const data = req.body;

    if (!isValidObjectId(userId) || !isValidObjectId(data.role)) {
        return res
            .status(400)
            .json({ error: "User ID and role ID are required" });
    }

    try {
        // if (!role) {
        //     return res.status(404).json({ error: "Role not found" });
        // }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res
            .status(200)
            .json({ msg: "User role updated successfully", data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
