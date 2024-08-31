import express from "express";
import passport from "passport";

import methods from "@/controllers/categories";
import { hasRole } from "@/middlewares";

const categories = (router: express.Router) => {
    router.get(
        "/categories",
        passport.authenticate("jwt", { session: false }),
        methods.read
    );

    router.get(
        "/categories/byLevel",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readByLevel
    );

    router.get(
        "/categories/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readById
    );

    router.get(
        "/categories/:id/childrens",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readChildrens
    );

    router.post(
        "/categories",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.patch(
        "/categories/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.update
    );

    router.delete(
        "/categories/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.delete
    );
};

export default categories;
