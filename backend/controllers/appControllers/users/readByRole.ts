import express from "express";
import _ from "lodash";
import { MongooseQueryParser } from "mongoose-query-parser";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { UserModel } from "../../../models/User";
import { PaginatedUsers } from "../../../types/User";

const parser = new MongooseQueryParser();

export const getUsersByRole = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const { roleName, ...rest } = req.query;

    if (!roleName) {
        return res
            .status(400)
            .json(errorResponse(null, "Role name required", 400));
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
            return res
                .status(404)
                .json(errorResponse(null, "Users not found", 404));
        }

        return res
            .status(200)
            .json(successResponse(filteredUsers, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
