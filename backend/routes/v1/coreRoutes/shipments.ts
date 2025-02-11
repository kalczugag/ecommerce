import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/shipments";
import { hasRole } from "../../../middlewares";

const shipments = (router: express.Router) => {
    router.patch(
        "/shipments/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default shipments;
