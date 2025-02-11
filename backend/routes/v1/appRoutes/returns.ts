import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/orderReturn";
import { hasRole, isOwner } from "../../../middlewares";

const returns = (router: express.Router) => {
    router.get(
        "/returns",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );

    router.get(
        "/returns/:id",
        passport.authenticate("jwt", { session: false }),
        isOwner,
        methods.readById
    );

    router.post(
        "/returns",
        passport.authenticate("jwt", { session: false }),
        methods.create
    );

    router.patch(
        "/returns/:id",
        passport.authenticate("jwt", { session: false }),
        isOwner,
        methods.update
    );
};

export default returns;
