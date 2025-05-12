import { createCampaign } from "./create";
import { deleteCampaign } from "./delete";
import { getAllCampaigns } from "./read";
import { refreshCampaigns } from "./refresh";

const methods = {
    read: getAllCampaigns,
    refresh: refreshCampaigns,
    create: createCampaign,
    delete: deleteCampaign,
};

export default methods;
