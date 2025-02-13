import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/deliveryMethods";
import { hasRole, cache } from "../../../middlewares";

const deliveryMethods = (router: express.Router) => {
    router.get("/deliveryMethods", cache("deliveryMethods"), methods.read);

    router.get("/deliveryMethods/:id", methods.readByProviderId);

    router.post(
        "/deliveryMethods",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.patch(
        "/deliveryMethods/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default deliveryMethods;
