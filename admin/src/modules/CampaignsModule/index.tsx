import Wrapper from "@/components/Wrapper";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard, {
    SummaryCardProps,
} from "../DashboardModule/components/SummaryCard";
import { Button } from "@mui/material";
import { CampaignsGlobalSummary } from "@/types/FeaturedCampaign";

const ExtendedSummaryCard = ({
    queryKey,
    ...rest
}: { queryKey: string } & SummaryCardProps) => {
    return (
        <SummaryCard {...rest}>
            <Button variant="outlined" sx={{ mt: 2 }}>
                Show
            </Button>
        </SummaryCard>
    );
};

interface CampaignsModuleProps {
    data?: CampaignsGlobalSummary;
    isLoading: boolean;
}

const CampaignsModule = ({ data, isLoading }: CampaignsModuleProps) => {
    const cardsConfig = [
        { label: "Total Campaigns", value: data?.total, queryKey: "total" },
        {
            label: "Active Campaigns",
            value: data?.active,
            queryKey: "active",
        },
        {
            label: "Inactive Campaigns",
            value: data?.inactive,
            queryKey: "inactive",
        },
    ];

    return (
        <DefaultLayout>
            <Wrapper>
                {cardsConfig.map((card, index) => (
                    <ExtendedSummaryCard
                        key={index}
                        isLoading={isLoading}
                        {...card}
                    />
                ))}
            </Wrapper>
        </DefaultLayout>
    );
};

export default CampaignsModule;
