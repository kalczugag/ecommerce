import { useTitle } from "@/hooks/useTitle";
import CampaignAddModule from "@/modules/CampaignsModule/CampaignAddModule";

const CampaignsAdd = () => {
    useTitle("Campaign - Add");

    return <CampaignAddModule />;
};

export default CampaignsAdd;
