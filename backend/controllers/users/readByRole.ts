import express from "express";
import _ from "lodash";
import { UserModel } from "../../models/User";
import { PaginatedUsers } from "../../types/User";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getUsersByRole = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const { roleName, ...rest } = req.query;

    if (!roleName) {
        return res.status(400).json({ error: "Role name is required" });
    }

    const parsedQuery = parser.parse(rest);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const users = await UserModel.find(parsedQuery.filter)
            .populate({
                path: "role",
                match: { name: roleName },
                select: "name",
            })
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await UserModel.countDocuments(
            parsedQuery.filter
        );

        const filteredUsers = _.compact(
            users.map((user) => (user._role ? user : null))
        );

        if (filteredUsers.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res
            .status(200)
            .json({ data: filteredUsers, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
