import express from "express";
import passport from "passport";

import methods from "../../../controllers/coreControllers/notes";
import { hasRole } from "../../../middlewares";

const notes = (router: express.Router) => {
    router.get(
        "/notes/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.readByOrderId
    );

    router.post(
        "/notes",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.create
    );

    router.patch(
        "/notes/:id",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.reorder
    );
};

export default notes;
