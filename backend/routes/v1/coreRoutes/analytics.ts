import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/analytics";
import { hasRole } from "../../../middlewares";

const analytics = (router: express.Router) => {
    router.get(
        "/analytics/dailySummary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readDailySummary
    );
};

export default analytics;
