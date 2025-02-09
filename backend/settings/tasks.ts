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
        const endOfWeek = moment().endOf("week").toDate();
        const startOfMonth = moment().startOf("month").toDate();
        const endOfMonth = moment().endOf("month").toDate();
        const startOfYear = moment().startOf("year").toDate();
        const endOfYear = moment().endOf("year").toDate();

        const orders = await OrderModel.find().populate("_payment").exec();
        const users = await UserModel.find();

        const summary = await SummaryModel.findOneAndUpdate(
            {},
            { $setOnInsert: { createdAt: new Date() } },
            { upsert: true, new: true }
        );

        const totalEarnings = _.sumBy(orders, "total");
        const ordersCount = orders.length;
        const paidEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    (order.payments as Payment[]).length > 0 &&
                    (order.payments as Payment[])[0].paymentStatus ===
                        "completed"
            ),
            "total"
        );
        const itemsCount = _.sumBy(orders, (order) =>
            _.sumBy(order.items as Item[], "quantity")
        );

        const thisWeekEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >= startOfWeek &&
                    new Date(order.createdAt) <= endOfWeek
            ),
            "total"
        );
        const lastWeekEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >=
                        moment(startOfWeek).subtract(1, "week").toDate() &&
                    new Date(order.createdAt) < startOfWeek
            ),
            "total"
        );
        const thisMonthEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >= startOfMonth &&
                    new Date(order.createdAt) <= endOfMonth
            ),
            "total"
        );
        const lastMonthEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >=
                        moment(startOfMonth).subtract(1, "month").toDate() &&
                    new Date(order.createdAt) < startOfMonth
            ),
            "total"
        );
        const thisYearEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >= startOfYear &&
                    new Date(order.createdAt) <= endOfYear
            ),
            "total"
        );
        const lastYearEarnings = _.sumBy(
            orders.filter(
                (order) =>
                    new Date(order.createdAt) >=
                        moment(startOfYear).subtract(1, "year").toDate() &&
                    new Date(order.createdAt) < startOfYear
            ),
            "total"
        );

        const totalUsers = users.length;
        const thisWeekUsers = users.filter(
            (user) => new Date(user.createdAt) >= startOfWeek
        ).length;
        const lastWeekUsers = users.filter(
            (user) =>
                new Date(user.createdAt) >=
                    moment(startOfWeek).subtract(1, "week").toDate() &&
                new Date(user.createdAt) < startOfWeek
        ).length;
        const thisMonthUsers = users.filter(
            (user) => new Date(user.createdAt) >= startOfMonth
        ).length;
        const lastMonthUsers = users.filter(
            (user) =>
                new Date(user.createdAt) >=
                    moment(startOfMonth).subtract(1, "month").toDate() &&
                new Date(user.createdAt) < startOfMonth
        ).length;
        const thisYearUsers = users.filter(
            (user) => new Date(user.createdAt) >= startOfYear
        ).length;
        const lastYearUsers = users.filter(
            (user) =>
                new Date(user.createdAt) >=
                    moment(startOfYear).subtract(1, "year").toDate() &&
                new Date(user.createdAt) < startOfYear
        ).length;

        const thisWeekVisitors = summary.visitors.thisWeek || 0;
        const lastWeekVisitors = summary.visitors.thisWeek || 0;
        const thisMonthVisitors = summary.visitors.thisMonth || 0;
        const lastMonthVisitors = summary.visitors.thisMonth || 0;
        const thisYearVisitors = summary.visitors.thisYear || 0;
        const lastYearVisitors = summary.visitors.thisYear || 0;

        if (
            now.getDay() === 1 &&
            now.getHours() === 0 &&
            now.getMinutes() === 0
        ) {
            summary.visitors.thisWeek = 0;
            summary.visitors.lastWeek = thisWeekVisitors;

            if (now.getDate() === 1) {
                summary.visitors.thisMonth = 0;
                summary.visitors.lastMonth = thisMonthVisitors;

                if (now.getMonth() === 0 && now.getDate() === 1) {
                    summary.visitors.thisYear = 0;
                    summary.visitors.lastYear = thisYearVisitors;
                } else {
                    summary.visitors.thisYear = summary.visitors.thisYear || 0;
                    summary.visitors.lastYear = thisYearVisitors;
                }
            } else {
                summary.visitors.thisMonth = summary.visitors.thisMonth || 0;
                summary.visitors.lastMonth = thisMonthVisitors;
            }
        }

        summary.orders.total = totalEarnings;
        summary.orders.count = ordersCount;
        summary.orders.paid = paidEarnings;
        summary.orders.itemsCount = itemsCount;
        summary.orders.thisWeek = thisWeekEarnings;
        summary.orders.lastWeek = lastWeekEarnings;
        summary.orders.thisMonth = thisMonthEarnings;
        summary.orders.lastMonth = lastMonthEarnings;
        summary.orders.thisYear = thisYearEarnings;
        summary.orders.lastYear = lastYearEarnings;

        summary.users.count = totalUsers;
        summary.users.thisWeek = thisWeekUsers;
        summary.users.lastWeek = lastWeekUsers;
        summary.users.thisMonth = thisMonthUsers;
        summary.users.lastMonth = lastMonthUsers;
        summary.users.thisYear = thisYearUsers;
        summary.users.lastYear = lastYearUsers;

        await summary.save();

        console.log("Summary statistics updated successfully.");
    } catch (error) {
        console.error("Error updating summary statistics:", error);
    }
};

export const sendEmailReports = () => {};
