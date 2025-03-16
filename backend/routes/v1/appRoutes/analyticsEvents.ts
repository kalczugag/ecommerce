import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/analyticsEvents";

const analyticsEvents = (router: express.Router) => {
    router.post("/metrics", methods.create);
};

export default analyticsEvents;
