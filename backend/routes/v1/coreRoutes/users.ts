import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/payments";
import { hasRole } from "../../../middlewares";

const users = (router: express.Router) => {
    router.patch(
        "/users/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default users;
