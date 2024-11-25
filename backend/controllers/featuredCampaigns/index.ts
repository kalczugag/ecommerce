import { getAllCampaigns } from "./read";
import { createCampaign } from "./create";

const methods = {
    read: getAllCampaigns,
    create: createCampaign,
};

export default methods;
