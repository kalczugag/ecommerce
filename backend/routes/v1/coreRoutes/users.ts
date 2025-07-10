import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/users";
import { hasRole } from "../../../middlewares";

const users = (router: express.Router) => {
    router.get(
        "/users",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );

    router.post(
        "/users",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.delete(
        "/users/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default users;
