import express from "express";
import passport from "passport";

import methods from "../../controllers/featuredCampaigns";
import { hasRole, optionalAuth } from "../../middlewares";

const featuredCampaigns = (router: express.Router) => {
    router.get("/campaigns", optionalAuth, methods.read);

    router.post(
        "/campaigns",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );
};

export default featuredCampaigns;
