import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/analytics";
import { cache, hasRole } from "../../../middlewares";

const analytics = (router: express.Router) => {
    router.get(
        "/analytics/dailySummary",
        passport.authenticate("jwt", { session: false }),
        cache("dailySummary"),
        hasRole("admin"),
        methods.readDailySummary
    );

    router.get(
        "/analytics/productDailySummary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readProductDailySummary
    );

    router.get(
        "/analytics/campaignsDailySummary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readCampaignsDailySummary
    );

    router.get(
        "/analytics/campaignsGlobalSummary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readCampaignsGlobalSummary
    );
};

export default analytics;
