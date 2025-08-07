import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/tax";
import { hasRole } from "../../../middlewares";

const tax = (router: express.Router) => {
    router.get(
        "/taxes",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.read
    );

    router.get(
        "/taxes/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        methods.readById
    );

    router.post(
        "/taxes",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.delete(
        "/taxes/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.delete
    );

    router.patch(
        "/taxes/:id",
        passport.authenticate(["jwt", "google"], { session: false }),
        hasRole("admin"),
        methods.update
    );
};

export default tax;
