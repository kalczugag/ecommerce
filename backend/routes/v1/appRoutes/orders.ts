import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/orders";
import { hasRole, hasAddress, isOwner } from "../../../middlewares";

const orders = (router: express.Router) => {
    router.get("/orders/id/:id", methods.readById);

    router.get(
        "/orders/userId/:userId",
        passport.authenticate(["jwt", "google"], { session: false }),
        methods.readByUserId
    );

    router.post("/orders", methods.create);

    router.delete(
        "/orders/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        isOwner("order"),
        methods.delete
    );

    router.patch(
        "/orders/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasAddress,
        isOwner("order"),
        methods.update
    );
};

export default orders;
