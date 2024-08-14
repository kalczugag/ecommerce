import express from "express";
import _ from "lodash";
import { UserModel } from "@/models/User";

export const getUsersByRole = async (
    req: express.Request<{}, {}, {}, { roleName: string }>,
    res: express.Response
) => {
    const { roleName } = req.query;

    if (!roleName) {
        return res.status(400).json({ error: "Role name is required" });
    }

    try {
        const users = await UserModel.find()
            .populate({
                path: "role",
                match: { name: roleName },
                select: "name",
            })
            .exec();

        const filteredUsers = _.compact(
            users.map((user) => (user.role ? user : null))
        );

        if (filteredUsers.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
