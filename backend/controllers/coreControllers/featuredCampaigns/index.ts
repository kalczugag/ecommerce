import { createCampaign } from "./create";
import { deleteCampaign } from "./delete";
import { refreshCampaigns } from "./refresh";

const methods = {
    refresh: refreshCampaigns,
    create: createCampaign,
    delete: deleteCampaign,
};

export default methods;
