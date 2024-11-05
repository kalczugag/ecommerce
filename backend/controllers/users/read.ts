import express from "express";
import { UserModel } from "../../models/User";
import { PaginatedUsers } from "../../types/User";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getAllUsers = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const parsedQuery = parser.parse(req.query);

    try {
        const users = await UserModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(parsedQuery.skip || 0)
            .limit(parsedQuery.limit || 5)
            .exec();

        const totalDocuments = await UserModel.countDocuments(
            parsedQuery.filter
        );

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
