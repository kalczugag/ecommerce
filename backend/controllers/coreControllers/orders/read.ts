import express from "express";
import { MongooseQueryParser } from "mongoose-query-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { PaginatedOrders } from "../../../types/Order";

dayjs.extend(utc);
dayjs.extend(tz);

const statusPriority = {
    placed: 1,
    confirmed: 2,
    shipped: 3,
    delivered: 4,
    "pending payment": 5,
    returned: 6,
    canceled: 7, // Lowest priority
};

const parser = new MongooseQueryParser();

export const getAllOrders = async (
    req: express.Request<{}, {}, {}, PaginatedOrders>,
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

    const { search, orderDate } = parsedQuery.filter;

    if (orderDate) {
        const iso = new Date(orderDate);

        const localDay = dayjs(iso).tz("Europe/Warsaw");

        const start = localDay.startOf("day").utc().toDate();
        const end = localDay.add(1, "day").startOf("day").utc().toDate();

        match.createdAt = { $gte: start, $lt: end };
    }

    if (search) {
        const parsedNumber = parseInt(search, 10);
        const isNum = !isNaN(parsedNumber);

        match.$or = [
            ...(isNum ? [{ orderNumber: parsedNumber }] : []),
            { "_user.firstName": { $regex: search, $options: "i" } },
            { "_user.lastName": { $regex: search, $options: "i" } },
            { "_user.email": { $regex: search, $options: "i" } },
        ];
    }

    try {
        const pipeline = [
            {
                $lookup: {
                    from: "baseitems",
                    localField: "items",
                    foreignField: "_id",
                    as: "items",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_user",
                    foreignField: "_id",
                    pipeline: [
                        { $project: { firstName: 1, lastName: 1, email: 1 } },
                    ],
                    as: "_user",
                },
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "payments",
                    foreignField: "_id",
                    pipeline: [{ $project: { paymentStatus: 1 } }],
                    as: "payments",
                },
            },
            {
                $match: match,
            },
            {
                $addFields: {
                    statusPriority: {
                        $switch: {
                            branches: Object.entries(statusPriority).map(
                                ([key, value]) => ({
                                    case: { $eq: ["$status", key] },
                                    then: value,
                                })
                            ),
                            default: 99,
                        },
                    },
                },
            },
            {
                $set: {
                    _user: { $arrayElemAt: ["$_user", 0] },
                },
            },
            { $sort: { statusPriority: 1 as 1, createdAt: -1 as -1 } },
        ];

        const result = await OrderModel.aggregate([
            ...pipeline,
            {
                $facet: {
                    data: [{ $skip: page * pageSize }, { $limit: pageSize }],
                    total: [{ $count: "count" }],
                },
            },
        ]);

        // const countResult = await OrderModel.aggregate([
        //     ...pipeline,
        //     { $count: "total" },
        // ]);

        const orders = result[0]?.data || [];
        const totalDocuments = result[0]?.total[0]?.count || 0;

        if (!orders.length) {
            return res
                .status(404)
                .json(errorResponse([], "No orders found", 404));
        }

        return res
            .status(200)
            .json(successResponse(orders, "OK", 200, totalDocuments));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
