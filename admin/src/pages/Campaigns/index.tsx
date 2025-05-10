import { useGetCampaignsGlobalSummaryQuery } from "@/store/apis/analyticsApi";
import { useTitle } from "@/hooks/useTitle";
import CampaignsModule from "@/modules/CampaignsModule";

const Campaigns = () => {
    useTitle("Campaigns");

    const { data, isSuccess } = useGetCampaignsGlobalSummaryQuery();

    if (!isSuccess) return null;

    return <CampaignsModule data={data?.result} />;
};

export default Campaigns;
