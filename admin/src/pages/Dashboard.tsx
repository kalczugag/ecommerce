import { useGetDailySummaryQuery } from "@/store/apis/analyticsApi";
import { useTitle } from "@/hooks/useTitle";
import DashboardModule from "@/modules/DashboardModule";
import NotFound from "@/components/NotFound";

const Dashboard = () => {
    useTitle("Dashboard - Admin");

    const { data, isLoading, isError } = useGetDailySummaryQuery({
        last30Days: true,
        last6Months: true,
    });

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return data?.result && <DashboardModule data={data.result} />;
};

export default Dashboard;
