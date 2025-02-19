import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/products";
import { hasRole } from "../../../middlewares";

const products = (router: express.Router) => {
    router.get("/products", methods.read);

    router.get("/products/id/:id", methods.readById);

    router.get("/products/featured", methods.readFeatured);

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
