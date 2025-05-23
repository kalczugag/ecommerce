import { getDailySummary } from "./readDailySummary";
import { getProductDailySummary } from "./readProductDailySummary";
import { getCampaignsGlobalSummary } from "./readCampaignsGlobalSummary";
import { getCampaignsDailySummary } from "./readCampaignsDailySummary";

const methods = {
    readDailySummary: getDailySummary,
    readProductDailySummary: getProductDailySummary,
    readCampaignsDailySummary: getCampaignsDailySummary,
    readCampaignsGlobalSummary: getCampaignsGlobalSummary,
};

export default methods;
