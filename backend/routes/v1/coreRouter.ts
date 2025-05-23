import express from "express";

import orders from "./coreRoutes/orders";
import payments from "./coreRoutes/payments";
import users from "./coreRoutes/users";
import shipments from "./coreRoutes/shipments";
import baseItems from "./coreRoutes/baseItems";
import notes from "./coreRoutes/notes";
import analytics from "./coreRoutes/analytics";
import featuredCampaigns from "./coreRoutes/featuredCampaigns";

const router = express.Router();

export default (): express.Router => {
    orders(router);
    payments(router);
    shipments(router);
    users(router);
    baseItems(router);
    notes(router);
    analytics(router);
    featuredCampaigns(router);

    return router;
};
