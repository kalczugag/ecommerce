import Wrapper from "@/components/Wrapper";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard from "../DashboardModule/components/SummaryCard";

const CampaignsModule = () => {
    return (
        <DefaultLayout>
            <Wrapper>
                <SummaryCard label="Total Campaigns" value={11} />
                <SummaryCard label="Active Campaigns" value={1} />
                <SummaryCard label="Inactive Campaigns" value={2} />
            </Wrapper>
        </DefaultLayout>
    );
};

export default CampaignsModule;
