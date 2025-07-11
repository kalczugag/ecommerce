import { useEffect } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import Wrapper from "@/components/Wrapper";
import DefaultLayout from "@/layouts/DefaultLayout";
import SummaryCard, {
    type SummaryCardProps,
} from "../../DashboardModule/components/SummaryCard";
import { CampaignsGlobalSummary } from "@/types/FeaturedCampaign";
import CrudModule, { type CrudModuleProps } from "../../CrudModule";

const ExtendedSummaryCard = ({
    queryKey,
    ...rest
}: { queryKey: string } & SummaryCardProps) => {
    const [queryParams, setQueryParams] = useQueryParams();

    const activeKey = queryParams.get("queryKey") || "total";
    const isActiveKey = activeKey === queryKey;

    const handleClick = () => {
        if (!isActiveKey) setQueryParams({ queryKey });
    };

    const handleRemoveKey = () => {
        setQueryParams({ queryKey: "total" });
    };

    useEffect(() => {
        setQueryParams({ queryKey: activeKey });
    }, []);

    return (
        <SummaryCard {...rest}>
            {/* <Box sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleClick}
                    disabled={isActiveKey}
                >
                    {isActiveKey ? "Selected" : "Show"}
                </Button>
                {isActiveKey && (
                    <IconButton onClick={handleRemoveKey} sx={{ ml: 1 }}>
                        <Close fontSize="small" />
                    </IconButton>
                )}
            </Box> */}
        </SummaryCard>
    );
};

interface CampaignsListModuleProps {
    config: CrudModuleProps["config"];
    data?: CampaignsGlobalSummary;
    isLoading: boolean;
    formElements: JSX.Element;
}

const CampaignsListModule = ({
    data,
    isLoading,
    config,
    formElements,
}: CampaignsListModuleProps) => {
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
        <DefaultLayout className="space-y-8">
            <Wrapper>
                {cardsConfig.map((card, index) => (
                    <ExtendedSummaryCard
                        key={index}
                        isLoading={isLoading}
                        {...card}
                    />
                ))}
            </Wrapper>
            <CrudModule
                config={config}
                actionForm={formElements}
                padding={false}
            />
        </DefaultLayout>
    );
};

export default CampaignsListModule;
