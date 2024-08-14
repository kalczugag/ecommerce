import express from "express";
import { isValidObjectId } from "mongoose";
import { UserModel } from "@/models/User";

export const getUserById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
