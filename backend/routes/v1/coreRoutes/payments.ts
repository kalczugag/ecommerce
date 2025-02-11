import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/payments";
import { hasRole } from "../../../middlewares";

const orders = (router: express.Router) => {
    router.patch(
        "/payments/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default orders;
