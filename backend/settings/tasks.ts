import moment from "moment";
import _ from "lodash";

import { OrderModel } from "../models/Order";
import { UserModel } from "../models/User";
import { SummaryModel } from "../models/Summary";
import type { Item, Payment } from "../types/Order";

export const updateSummaryStatistics = async () => {
    try {
        const now = new Date();
        const startOfWeek = moment().startOf("week").toDate();
        const startOfMonth = moment().startOf("month").toDate();
        const startOfYear = moment().startOf("year").toDate();

        const orders = await OrderModel.find().populate("payments").exec();
        const users = await UserModel.find();

        const summary = await SummaryModel.findOneAndUpdate(
            {},
            { $setOnInsert: { createdAt: now } },
            { upsert: true, new: true }
        );

        const totalEarnings = _.sumBy(orders, "total");
        const ordersCount = orders.length;

        const paidEarnings = _.sumBy(
            orders.filter((order) =>
                (order.payments as Payment[]).some(
                    (payment: Payment) => payment.paymentStatus === "completed"
                )
            ),
            "total"
        );

        const itemsCount = _.sumBy(orders, (order) =>
            _.sumBy(order.items as Item[], "quantity")
        );

        const earningsByDateRange = (startDate: Date, endDate: Date) =>
            _.sumBy(
                orders.filter(
                    (order) =>
                        new Date(order.createdAt) >= startDate &&
                        new Date(order.createdAt) <= endDate
                ),
                "total"
            );

        summary.orders = {
            total: totalEarnings,
            count: ordersCount,
            paid: paidEarnings,
            itemsCount,
            thisWeek: earningsByDateRange(
                startOfWeek,
                moment(startOfWeek).endOf("week").toDate()
            ),
            lastWeek: earningsByDateRange(
                moment(startOfWeek).subtract(1, "week").toDate(),
                startOfWeek
            ),
            thisMonth: earningsByDateRange(
                startOfMonth,
                moment(startOfMonth).endOf("month").toDate()
            ),
            lastMonth: earningsByDateRange(
                moment(startOfMonth).subtract(1, "month").toDate(),
                startOfMonth
            ),
            thisYear: earningsByDateRange(
                startOfYear,
                moment(startOfYear).endOf("year").toDate()
            ),
            lastYear: earningsByDateRange(
                moment(startOfYear).subtract(1, "year").toDate(),
                startOfYear
            ),
        };

        summary.users = {
            count: users.length,
            thisWeek: users.filter(
                (user) => new Date(user.createdAt) >= startOfWeek
            ).length,
            lastWeek: users.filter(
                (user) =>
                    new Date(user.createdAt) >=
                        moment(startOfWeek).subtract(1, "week").toDate() &&
                    new Date(user.createdAt) < startOfWeek
            ).length,
            thisMonth: users.filter(
                (user) => new Date(user.createdAt) >= startOfMonth
            ).length,
            lastMonth: users.filter(
                (user) =>
                    new Date(user.createdAt) >=
                        moment(startOfMonth).subtract(1, "month").toDate() &&
                    new Date(user.createdAt) < startOfMonth
            ).length,
            thisYear: users.filter(
                (user) => new Date(user.createdAt) >= startOfYear
            ).length,
            lastYear: users.filter(
                (user) =>
                    new Date(user.createdAt) >=
                        moment(startOfYear).subtract(1, "year").toDate() &&
                    new Date(user.createdAt) < startOfYear
            ).length,
        };

        await summary.save();
        console.log("Summary statistics updated successfully.");
    } catch (error) {
        console.error("Error updating summary statistics:", error);
    }
};
