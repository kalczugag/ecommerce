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
        "/orders/summary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.summary
    );

    router.get("/orders/id/:id", methods.readById);

    router.get(
        "/orders/userId/:userId",
        passport.authenticate("jwt", { session: false }),
        methods.readByUserId
    );

    router.post(
        "/orders",
        passport.authenticate("jwt", { session: false }),
        hasAddress,
        methods.create
    );

    router.patch(
        "/orders/:id",
        passport.authenticate("jwt", { session: false }),
        methods.update
    );
};

export default orders;
