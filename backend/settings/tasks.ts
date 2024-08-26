import moment from "moment";
import _ from "lodash";

import { OrderModel } from "@/models/Order";
import { UserModel } from "@/models/User";
import { SummaryModel } from "@/models/Summary";

export const updateSummaryStatistics = async () => {
    try {
        // Get the start and end of the current week, month, and year
        const startOfWeek = moment().startOf("week").toDate();
        const endOfWeek = moment().endOf("week").toDate();
        const startOfMonth = moment().startOf("month").toDate();
        const endOfMonth = moment().endOf("month").toDate();
        const startOfYear = moment().startOf("year").toDate();
        const endOfYear = moment().endOf("year").toDate();

        // Fetch orders and users
        const orders = await OrderModel.find();
        const users = await UserModel.find();

        // Initialize summary data
        const summary = await SummaryModel.findOneAndUpdate(
            {},
            { $setOnInsert: { createdAt: new Date() } },
            { upsert: true, new: true }
        );

        // Calculate order statistics
        const totalEarnings = _.sumBy(orders, "total");
        const ordersCount = orders.length;
        const paidEarnings = _.sumBy(
            orders.filter((order) => order.paymentStatus === "paid"),
            "total"
        );
        const itemsCount = _.sumBy(orders, (order) =>
            _.sumBy(order.items, "quantity")
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

        // Calculate user statistics
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

        // Update the summary document
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
