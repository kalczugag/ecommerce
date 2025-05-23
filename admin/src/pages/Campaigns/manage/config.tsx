import { SummaryPage } from "@/modules/CampaignsModule/CampaignsManageModule";
import type { Manage, ManageAction } from "@/modules/ManageModule/types/Manage";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

type EnhancedData = FeaturedCampaign & ManageAction;

export const config: Manage[] = [
    {
        key: "cmapaign_summary",
        label: "Summary",
        element: (props: FeaturedCampaign) => <SummaryPage data={props} />,
    },
];
