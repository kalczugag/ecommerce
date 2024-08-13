import express from "express";
import passport from "passport";

import methods from "@/controllers/products";
import { hasRole } from "@/middlewares";

const products = (router: express.Router) => {
    router.get(
        "/products",
        passport.authenticate("jwt", { session: false }),
        methods.read
    );
    router.get(
        "/products/:id",
        passport.authenticate("jwt", { session: false }),
        methods.readById
    );
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
