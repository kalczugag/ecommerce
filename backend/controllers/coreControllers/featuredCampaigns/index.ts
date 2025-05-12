import { createCampaign } from "./create";
import { deleteCampaign } from "./delete";
import { getAllCampaigns } from "./read";
import { getCampaignById } from "./readById";
import { refreshCampaigns } from "./refresh";

const methods = {
    read: getAllCampaigns,
    readById: getCampaignById,
    refresh: refreshCampaigns,
    create: createCampaign,
    delete: deleteCampaign,
};

export default methods;
