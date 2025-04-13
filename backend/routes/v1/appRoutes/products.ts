import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/products";
import { hasRole, optionalAuth } from "../../../middlewares";

const products = (router: express.Router) => {
    router.get("/products", optionalAuth, methods.read);

    router.get("/products/id/:id", optionalAuth, methods.readById);

    router.get("/products/featured", optionalAuth, methods.readFeatured);

    router.get("/products/filters", methods.readFilters);

    router.post(
        "/products",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.patch(
        "/products/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );

    router.delete(
        "/products/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default products;
