import express from "express";
import passport from "passport";

import methods from "../../controllers/users";
import { hasRole } from "../../middlewares";

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
    router.patch(
        "/users/:userId",
        passport.authenticate("jwt", { session: false }),
        //add isOwner middleware
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
