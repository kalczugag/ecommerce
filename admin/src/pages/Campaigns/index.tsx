import { useGetCampaignsGlobalSummaryQuery } from "@/store/apis/analyticsApi";
import { useTitle } from "@/hooks/useTitle";
import CampaignsModule from "@/modules/CampaignsModule";
import NotFound from "@/components/NotFound";

const Campaigns = () => {
    useTitle("Campaigns");

    const { data, isLoading, isError } = useGetCampaignsGlobalSummaryQuery();

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return <CampaignsModule data={data?.result} isLoading={isLoading} />;
};

export default Campaigns;
