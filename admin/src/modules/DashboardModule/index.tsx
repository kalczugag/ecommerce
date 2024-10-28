import { useGetSummaryQuery, useGetOrdersSummaryQuery } from "@/store";
import { weeklyComparison } from "@/utils/weeklyComparison";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard from "./components/SummaryCard";
import PreviewCard from "./components/PreviewCard";
import {
    LocalShippingOutlined,
    PeopleOutlineOutlined,
    AttachMoneyOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import Loading from "@/components/Loading";

const DashboardModule = () => {
    const {
        data: summary,
        isLoading: summaryIsloading,
        isSuccess: summaryIsSuccess,
    } = useGetSummaryQuery();
    const {
        data: ordersSummary,
        isLoading: ordersSummaryIsLoading,
        isSuccess: ordersSummaryIsSuccess,
    } = useGetOrdersSummaryQuery("yearly");

    if (!summaryIsSuccess || !ordersSummaryIsSuccess) {
        return null;
    }

    const content = [
        {
            title: "Sales",
            value: summary.orders.total,
            prefix: "$",
            summary: weeklyComparison(
                summary.orders.thisWeek,
                summary.orders.lastWeek
            ),
            icon: <LocalShippingOutlined />,
        },
        {
            title: "Visitors",
            value: summary.visitors.total,
            summary: weeklyComparison(
                summary.visitors.thisWeek,
                summary.visitors.lastWeek
            ),
            icon: <PeopleOutlineOutlined />,
        },
        {
            title: "Earnings",
            value: summary.orders.paid,
            prefix: "$",
            summary: weeklyComparison(
                summary.orders.thisWeek,
                summary.orders.lastWeek
            ),
            icon: <AttachMoneyOutlined />,
        },
        {
            title: "Orders",
            value: summary.orders.count,
            summary: weeklyComparison(
                summary.orders.thisWeek,
                summary.orders.lastWeek
            ),
            icon: <ShoppingCartOutlined />,
        },
    ];

    return (
        <Loading isLoading={summaryIsloading || ordersSummaryIsLoading}>
            <DefaultLayout className="flex flex-col xl:flex-row xl:space-x-8">
                <div className="grid gap-x-8 xl:w-2/3 sm:grid-cols-2">
                    {content.map((item, index) => (
                        <SummaryCard key={index} {...item} />
                    ))}
                </div>

                <PreviewCard chartData={ordersSummary} />
            </DefaultLayout>
        </Loading>
    );
};

export default DashboardModule;
