import express from "express";
import moment from "moment";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";

interface IncomeByPeriod {
    period: string;
    total: number;
}

export const summary = async (
    req: express.Request<{}, {}, {}, { type: "weekly" | "monthly" | "yearly" }>,
    res: express.Response
) => {
    const { type } = req.query;
    let startDate: Date;
    let endDate: Date;
    let periodFormat: "week" | "month" | "year" | "day";
    let periodStart: (date: Date) => Date;
    let periodEnd: (date: Date) => Date;

    switch (type) {
        case "weekly":
            startDate = moment().startOf("week").toDate();
            endDate = moment().endOf("week").toDate();
            periodFormat = "day";
            periodStart = (date) => moment(date).startOf("day").toDate();
            periodEnd = (date) => moment(date).endOf("day").toDate();
            break;
        case "monthly":
            startDate = moment().startOf("month").toDate();
            endDate = moment().endOf("month").toDate();
            periodFormat = "week";
            periodStart = (date) => moment(date).startOf("week").toDate();
            periodEnd = (date) => moment(date).endOf("week").toDate();
            break;
        case "yearly":
            startDate = moment().startOf("year").toDate();
            endDate = moment().endOf("year").toDate();
            periodFormat = "month";
            periodStart = (date) => moment(date).startOf("month").toDate();
            periodEnd = (date) => moment(date).endOf("month").toDate();
            break;

        default:
            return res.status(400).json({ error: "Invalid type provided" });
    }

    try {
        const orders = await OrderModel.find({
            createdAt: { $gte: startDate, $lt: endDate },
        }).sort({ createdAt: 1 });

        const incomeByPeriod: { [key: string]: number } = {};

        orders.forEach((order) => {
            const orderDate = moment(order.createdAt);
            const periodStartDate = periodStart(orderDate.toDate());
            const periodKey = periodStartDate.toISOString();

            if (!incomeByPeriod[periodKey]) {
                incomeByPeriod[periodKey] = 0;
            }
            incomeByPeriod[periodKey] += order.total;
        });

        const allPeriods: IncomeByPeriod[] = [];
        let currentDate = moment(startDate);

        while (currentDate.isBefore(endDate)) {
            const periodKey = periodStart(currentDate.toDate()).toISOString();
            allPeriods.push({
                period: periodStart(currentDate.toDate()).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "2-digit" }
                ),
                total: incomeByPeriod[periodKey] || 0,
            });
            currentDate.add(1, periodFormat);
        }

        return res.status(200).json(successResponse(allPeriods));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
