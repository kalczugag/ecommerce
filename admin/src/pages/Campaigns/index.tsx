import { useTitle } from "@/hooks/useTitle";
import CampaignsModule from "@/modules/CampaignsModule";

const Campaigns = () => {
    useTitle("Campaigns");

    return <CampaignsModule />;
};

export default Campaigns;
