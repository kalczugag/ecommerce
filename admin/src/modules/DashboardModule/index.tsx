import { useGetSummaryQuery, useGetOrdersSummaryQuery } from "@/store";
import { weeklyComparison } from "@/utils/weeklyComparison";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard from "./components/SummaryCard";
import {
    LocalShippingOutlined,
    PeopleOutlineOutlined,
    AttachMoneyOutlined,
    ShoppingCartOutlined,
    Insights,
    ArrowForward,
    ArrowForwardIos,
    KeyboardArrowRight,
} from "@mui/icons-material";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";

const DashboardModule = () => {
    // const {
    //     data: summary,
    //     isLoading: summaryIsloading,
    //     isSuccess: summaryIsSuccess,
    // } = useGetSummaryQuery();
    // const {
    //     data: ordersSummary,
    //     isLoading: ordersSummaryIsLoading,
    //     isSuccess: ordersSummaryIsSuccess,
    // } = useGetOrdersSummaryQuery("yearly");

    // if (!summaryIsSuccess || !ordersSummaryIsSuccess) {
    //     return null;
    // }

    // const content = [
    //     {
    //         title: "Sales",
    //         value: summary.result.orders.total.toFixed(2),
    //         prefix: "$",
    //         summary: weeklyComparison(
    //             summary.result.orders.thisWeek,
    //             summary.result.orders.lastWeek
    //         ),
    //         icon: <LocalShippingOutlined />,
    //     },
    //     {
    //         title: "Visitors",
    //         value: summary.result.visitors.total.toString(),
    //         summary: weeklyComparison(
    //             summary.result.visitors.thisWeek,
    //             summary.result.visitors.lastWeek
    //         ),
    //         icon: <PeopleOutlineOutlined />,
    //     },
    //     {
    //         title: "Earnings",
    //         value: summary.result.orders.paid.toFixed(2),
    //         prefix: "$",
    //         summary: weeklyComparison(
    //             summary.result.orders.thisWeek,
    //             summary.result.orders.lastWeek
    //         ),
    //         icon: <AttachMoneyOutlined />,
    //     },
    //     {
    //         title: "Orders",
    //         value: summary.result.orders.count.toString(),
    //         summary: weeklyComparison(
    //             summary.result.orders.thisWeek,
    //             summary.result.orders.lastWeek
    //         ),
    //         icon: <ShoppingCartOutlined />,
    //     },
    // ];

    return (
        // <Loading isLoading={summaryIsloading || ordersSummaryIsLoading}>
        <DefaultLayout>
            <div className="flex flex-wrap justify-center gap-4">
                <SummaryCard
                    label="Users"
                    subLabel="Last 30 days"
                    value="14k"
                    rate={25}
                    data={[0]}
                />
                <SummaryCard
                    label="Conversions"
                    subLabel="Last 30 days"
                    value="325"
                    rate={-25}
                    data={[0]}
                />
                <SummaryCard
                    label="Event count"
                    subLabel="Last 30 days"
                    value="200k"
                    rate={5}
                    data={[0]}
                />
                <SummaryCard
                    label={
                        <div className="space-y-2">
                            <Insights />{" "}
                            <p className="font-semibold">Explore your data</p>
                        </div>
                    }
                >
                    <p className="text-sm pt-1">
                        Uncover performance and visitor insights with our data
                        wizardry.
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
                <SummaryCard
                    label="Sessions"
                    subLabel="Sessions per day for the last 30 days"
                    value="13,277"
                    rate={35}
                    data={[0]}
                    type="line"
                    size="large"
                />
            </div>
        </DefaultLayout>
        // </Loading>
    );
};

export default DashboardModule;
