import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/roles";
import { hasRole } from "../../../middlewares";

const roles = (router: express.Router) => {
    router.get(
        "/roles",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );
    router.post(
        "/roles",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );
};

export default roles;
