import express from "express";
import { UserModel } from "@/models/User";
import { PaginatedUsers } from "@/types/User";

export const getAllUsers = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const { page = 0, pageSize = 5 } = req.query;

    try {
        const totalDocuments = await UserModel.countDocuments();

        const users = await UserModel.find()
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res.status(200).json({ data: users, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
