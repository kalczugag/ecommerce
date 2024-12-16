import { useSearchParams } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";
import PreviewCard from "@/modules/DashboardModule/components/PreviewCard";
import { useGetOrdersSummaryQuery } from "@/store";
import type { summaryType } from "@/store/apis/ordersApi";

const Overview = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    useTitle(`Overview - ${type}`);

    const { data, isSuccess } = useGetOrdersSummaryQuery(type as summaryType);

    if (!isSuccess) {
        return null;
    }

    return (
        <DefaultLayout>
            <PreviewCard chartData={data} />
        </DefaultLayout>
    );
};

export default Overview;
