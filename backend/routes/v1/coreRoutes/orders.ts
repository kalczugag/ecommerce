import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/orders";
import { hasRole } from "../../../middlewares";

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

    router.get(
        "/orders/cron",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.updateToCron
    );

    router.delete(
        "/orders/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default orders;
