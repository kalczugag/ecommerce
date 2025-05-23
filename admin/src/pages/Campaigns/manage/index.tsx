import { useParams } from "react-router-dom";
import { useGetCampaignByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import ManageModule from "@/modules/ManageModule";
import NotFound from "@/components/NotFound";
import { config } from "./config";

const CampaignsManage = () => {
    const { id } = useParams();
    useTitle("Campaigns - Manage");

    const { data, isError, isLoading } = useGetCampaignByIdQuery(id || "");

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <ManageModule
            config={config}
            data={data?.result}
            isLoading={!data?.result}
        />
    );
};

export default CampaignsManage;
