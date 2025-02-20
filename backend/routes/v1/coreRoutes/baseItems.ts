import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/baseItem";
import { hasRole } from "../../../middlewares";

const baseItems = (router: express.Router) => {
    router.patch(
        "/items/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );

    router.delete(
        "/items/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default baseItems;
