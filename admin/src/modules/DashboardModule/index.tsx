import { ReactNode } from "react";
import dayjs from "dayjs";
import { comparison } from "@/utils/helpers";
import { Insights, KeyboardArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import DefaultLayout from "@/layouts/DefaultLayout";
import {
    generateLastMonths,
    generateMonthDays,
} from "@/utils/generateMonthDays";
import SummaryCard from "./components/SummaryCard";
import type { DailySummary } from "@/types/Analytics";
import type { ResultDataProps } from "@/store/apis/analyticsApi";

interface DashboardModuleProps {
    data: ResultDataProps;
}

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div className="flex flex-wrap gap-4 w-full">{children}</div>;
};

const formatSummaryData = (data: DailySummary[], key: keyof DailySummary) => {
    const monthDays = generateMonthDays(dayjs().year(), dayjs().month() + 1);

    const dateMap = new Map(
        data.map((item) => [dayjs(item.date).format("MMM D"), item[key] || 0])
    );

    return monthDays.map((day) => ({
        date: day,
        value: dateMap.get(day) ?? 0,
    }));
};

const formatLast6MonthsData = (
    data: { month: number; year: number; pageViews: number }[]
) => {
    const months = generateLastMonths(6);

    const dateMap = new Map(
        data.map((item) => [
            dayjs(item.month)
                .month(item.month - 1)
                .year(item.year)
                .format("MMM"),
            item.pageViews || 0,
        ])
    );

    return months.map((month) => ({
        date: month,
        value: dateMap.get(month) ?? 0,
    }));
};

const DashboardModule = ({ data }: DashboardModuleProps) => {
    const uniqueVisitors = data.last30Days.reduce(
        (acc, item) => acc + item.uniqueUsers,
        0
    );
    const orders = data.last30Days.reduce((acc, item) => acc + item.orders, 0);
    const earnings = data.last30Days.reduce(
        (acc, item) => acc + item.earnings,
        0
    );
    const pageViews = data.last6Months.reduce(
        (acc, item) => acc + item.pageViews,
        0
    );
    const sessions = {
        direct: data.last30Days.reduce(
            (acc, item) => acc + item.sessions.direct,
            0
        ),
        organic: data.last30Days.reduce(
            (acc, item) => acc + item.sessions.organic,
            0
        ),
        referral: data.last30Days.reduce(
            (acc, item) => acc + item.sessions.referral,
            0
        ),
    };

    const currSessionsAll =
        sessions.direct + sessions.organic + sessions.referral;
    const prevSessionsAll =
        data.prev30Days.sessions.direct +
        data.prev30Days.sessions.organic +
        data.prev30Days.sessions.referral;

    return (
        <DefaultLayout>
            <Wrapper>
                <Wrapper>
                    <SummaryCard
                        label="Unique Visitors"
                        subLabel="Last 30 days"
                        value={uniqueVisitors}
                        rate={comparison(
                            uniqueVisitors,
                            data.prev30Days.uniqueUsers
                        )}
                        data={formatSummaryData(data.last30Days, "uniqueUsers")}
                    />
                    <SummaryCard
                        label="Orders"
                        subLabel="Last 30 days"
                        value={orders}
                        rate={comparison(orders, data.prev30Days.orders)}
                        data={formatSummaryData(data.last30Days, "orders")}
                    />
                    <SummaryCard
                        label="Earnings"
                        subLabel="Last 30 days"
                        value={`$${earnings.toFixed(2)}`}
                        rate={comparison(earnings, data.prev30Days.earnings)}
                        data={formatSummaryData(data.last30Days, "earnings")}
                    />
                    <SummaryCard
                        label={
                            <div className="space-y-2">
                                <Insights />{" "}
                                <p className="font-semibold">
                                    Explore your data
                                </p>
                            </div>
                        }
                        data={[]}
                    >
                        <p className="text-sm pt-1">
                            Uncover performance and visitor insights with our
                            data wizardry.
                        </p>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ bgcolor: "#1c2028", mt: 1 }}
                                size="small"
                                endIcon={<KeyboardArrowRight />}
                            >
                                Get insights
                            </Button>
                        </div>
                    </SummaryCard>
                </Wrapper>
                <Wrapper>
                    <SummaryCard
                        label="Sessions"
                        subLabel="Sessions per day for the last 30 days"
                        value={
                            sessions.direct +
                            sessions.organic +
                            sessions.referral
                        }
                        rate={comparison(currSessionsAll, prevSessionsAll)}
                        data={formatSummaryData(data.last30Days, "sessions")}
                        type="line"
                        size="large"
                    />
                    <SummaryCard
                        label="Page views"
                        subLabel="Page views from the last 6 months"
                        value={pageViews}
                        rate={comparison(pageViews, data.prev6Months.pageViews)}
                        data={formatLast6MonthsData(data.last6Months)}
                        type="bar"
                        size="large"
                    />
                </Wrapper>
                <Wrapper>
                    <SummaryCard
                        label="Users by country"
                        data={data.users}
                        type="pie"
                        size="large"
                    />
                </Wrapper>
            </Wrapper>
        </DefaultLayout>
    );
};

export default DashboardModule;
