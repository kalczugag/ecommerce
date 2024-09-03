import express from "express";
import _ from "lodash";
import { UserModel } from "@/models/User";
import { PaginatedUsers } from "@/types/User";

export const getUsersByRole = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const { roleName, page = 0, pageSize = 5 } = req.query;

    if (!roleName) {
        return res.status(400).json({ error: "Role name is required" });
    }

    try {
        const totalDocuments = await UserModel.countDocuments();

        const users = await UserModel.find()
            .populate({
                path: "role",
                match: { name: roleName },
                select: "name",
            })
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const filteredUsers = _.compact(
            users.map((user) => (user.role ? user : null))
        );

        if (filteredUsers.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res
            .status(200)
            .json({ data: filteredUsers, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
