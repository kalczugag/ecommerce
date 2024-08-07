import express from "express";
import passport from "passport";

import { login, register } from "@/controllers/userAuth";

const auth = (router: express.Router) => {
    router.post(
        "/auth/login",
        login,
        passport.authenticate("jwt", { session: false })
    );
    router.post(
        "/auth/register",
        register,
        passport.authenticate("jwt", { session: false })
    );
    router.get(
        "/protected",
        passport.authenticate("jwt", { session: false }),
        (req, res, next) => {
            res.status(200).json({
                success: true,
                msg: "Access granted",
            });
        }
    );
};

export default auth;
