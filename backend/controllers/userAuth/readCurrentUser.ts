import express from "express";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../../models/User";
import { User } from "../../types/User";

export const getCurrentUser = async (
    req: express.Request,
    res: express.Response
) => {
    const { _id } = req.user as User;

    // if (!isValidObjectId(_id)) {
    //     return res.status(400).json({ error: "User ID is required" });
    // }

    try {
        const user = await UserModel.findById(_id).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
