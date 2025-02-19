import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/users";
import { hasRole, isOwner } from "../../../middlewares";

const users = (router: express.Router) => {
    router.get(
        "/users",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );

    router.get(
        "/users/byRole",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readByRole
    );

    router.get(
        "/users/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readById
    );

    router.post(
        "/users",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.patch(
        "/users/:id",
        passport.authenticate("jwt", { session: false }),
        isOwner("user"),
        methods.update
    );

    router.delete(
        "/users/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default users;
