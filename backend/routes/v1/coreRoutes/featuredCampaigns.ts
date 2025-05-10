import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/featuredCampaigns";
import { hasRole } from "../../../middlewares";

const featuredCampaigns = (router: express.Router) => {
    router.get(
        "/campaigns/refresh",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.refresh
    );

    router.post(
        "/campaigns",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.delete(
        "/campaigns/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default featuredCampaigns;
