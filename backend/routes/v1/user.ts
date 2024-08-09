import express from "express";
import passport from "passport";

import methods from "@/controllers/users";
import { hasRole } from "@/middlewares";

const users = (router: express.Router) => {
    router.get(
        "/users",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );
    router.patch(
        "/users/:userId",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default users;
