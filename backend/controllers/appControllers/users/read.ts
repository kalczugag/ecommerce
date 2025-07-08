import express from "express";
import { MongooseQueryParser } from "mongoose-query-parser";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { UserModel } from "../../../models/User";
import { PaginatedUsers } from "../../../types/User";

const parser = new MongooseQueryParser();

export const getAllUsers = async (
    req: express.Request<{}, {}, {}, PaginatedUsers>,
    res: express.Response
) => {
    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    const match: Record<string, any> = {};

    const { search } = parsedQuery.filter;

    if (search) {
        match.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    try {
        let query = UserModel.find(match)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize);

        if (parsedQuery.populate) {
            query = query.populate(parsedQuery.populate);
        }

        query = query.populate("_role");

        const users = await query.exec();

        const totalDocuments = await UserModel.countDocuments(match);

        if (!users || users.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No users found", 404));
        }

        return res
            .status(200)
            .json(successResponse(users, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
