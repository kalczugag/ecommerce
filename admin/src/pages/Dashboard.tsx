import { useGetDailySummaryQuery } from "@/store/apis/analyticsApi";
import { useTitle } from "@/hooks/useTitle";
import DashboardModule from "@/modules/DashboardModule";
import NotFound from "@/components/NotFound";
import type { ResultDataProps } from "@/store/apis/analyticsApi";

const placeholderData: ResultDataProps = {
    todayOrDate: [
        {
            _id: "placeholder1",
            date: new Date(),
            earnings: 0,
            eventCount: 0,
            orders: 0,
            pageViews: 0,
            sessions: {
                direct: 0,
                organic: 0,
                referral: 0,
            },
            uniqueUsers: 0,
        },
    ],
    last30Days: Array.from({ length: 1 }, (_, i) => ({
        _id: `placeholder_last30_${i}`,
        date: new Date(new Date(new Date().setDate(new Date().getDate() - i))),
        earnings: 0,
        eventCount: 0,
        orders: 0,
        pageViews: 0,
        sessions: {
            direct: 0,
            organic: 0,
            referral: 0,
        },
        uniqueUsers: 0,
    })),
    last6Months: Array.from({ length: 1 }, (_, i) => ({
        month: new Date().getMonth() + 1 - i,
        year: new Date().getFullYear(),
        pageViews: 0,
    })),
    users: {
        total: 1000,
        byCountry: [
            {
                _id: "1",
                country: "USA",
                count: 0,
                flag: "https://ipdata.co/flags/us.png",
            },
            {
                _id: "2",
                country: "Germany",
                count: 0,
                flag: "https://ipdata.co/flags/de.png",
            },
            {
                _id: "3",
                country: "India",
                count: 0,
                flag: "https://ipdata.co/flags/in.png",
            },
            {
                _id: "4",
                country: "UK",
                count: 0,
                flag: "https://ipdata.co/flags/gb.png",
            },
        ],
    },
    prev30Days: {
        uniqueUsers: 0,
        orders: 0,
        earnings: 0,
        sessions: {
            direct: 0,
            organic: 0,
            referral: 0,
        },
    },
    prev6Months: {
        pageViews: 0,
    },
};

const Dashboard = () => {
    useTitle("Dashboard - Admin");

    const { data, isLoading, isError } = useGetDailySummaryQuery({
        last30Days: true,
        last6Months: true,
        prev30Days: true,
        prev6Months: true,
    });

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <DashboardModule
            data={data?.result || placeholderData}
            isLoading={isLoading}
        />
    );
};

export default Dashboard;
