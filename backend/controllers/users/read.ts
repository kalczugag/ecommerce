import express from "express";
import { UserModel } from "@/models/User";

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await UserModel.find();

        console.log(req.user);

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
