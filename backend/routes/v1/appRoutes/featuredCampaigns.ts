import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/featuredCampaigns";
import { optionalAuth } from "../../../middlewares";

const featuredCampaigns = (router: express.Router) => {
    router.get("/campaigns", optionalAuth, methods.read);
};

export default featuredCampaigns;
