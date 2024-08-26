import express from "express";
import passport from "passport";

import methods from "@/controllers/summary";
import { hasRole } from "@/middlewares";

const summary = (router: express.Router) => {
    router.get(
        "/summary",
        passport.authenticate("jwt", { session: false }),
        hasRole("admin"),
        methods.read
    );
};

export default summary;
