import Wrapper from "@/components/Wrapper";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard, {
    SummaryCardProps,
} from "../DashboardModule/components/SummaryCard";
import { Button } from "@mui/material";

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

const CampaignsModule = () => {
    const cardsConfig = [
        { label: "Total Campaigns", value: 11, queryKey: "total" },
        { label: "Active Campaigns", value: 11, queryKey: "active" },
        { label: "Inactive Campaigns", value: 11, queryKey: "inactive" },
    ];

    return (
        <DefaultLayout>
            <Wrapper>
                {cardsConfig.map((card, index) => (
                    <ExtendedSummaryCard key={index} {...card} />
                ))}
            </Wrapper>
        </DefaultLayout>
    );
};

export default CampaignsModule;
