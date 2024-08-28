import { useSearchParams } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import PreviewCard from "@/modules/DashboardModule/components/PreviewCard";
import { useGetOrdersSummaryQuery } from "@/store";
import type { summaryType } from "@/store/apis/ordersApi";

const Overview = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    const { data, isLoading } = useGetOrdersSummaryQuery(type as summaryType);

    if (!data) {
        return null;
    }

    return (
        <DefaultLayout>
            <PreviewCard chartData={data} isLoading={isLoading} />
        </DefaultLayout>
    );
};

export default Overview;
