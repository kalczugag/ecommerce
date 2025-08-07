import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/users";
import { hasRole, isOwner } from "../../../middlewares";

const users = (router: express.Router) => {
    router.get(
        "/users/byRole",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.readByRole
    );

    router.get(
        "/users/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.readById
    );

    router.patch(
        "/users/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        isOwner("user"),
        methods.update
    );
};

export default users;
