import express from "express";
import passport from "passport";

import methods from "@/controllers/orders";
import { hasRole, hasAddress } from "@/middlewares";

const orders = (router: express.Router) => {
    router.get(
        "/orders",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );
    router.get(
        "/orders/:id",
        passport.authenticate("jwt", { session: false }),
        methods.readById
    );
    router.post(
        "/orders",
        passport.authenticate("jwt", { session: false }),
        hasAddress,
        methods.create
    );
};

export default orders;