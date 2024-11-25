import express from "express";
import passport from "passport";

import methods from "../../controllers/featuredCampaigns";
import { hasRole } from "../../middlewares";

const featuredCampaigns = (router: express.Router) => {
    router.get(
        "/campaigns",
        passport.authenticate("jwt", { session: false }),
        methods.read
    );

    router.post(
        "/campaigns",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );
};

export default featuredCampaigns;
