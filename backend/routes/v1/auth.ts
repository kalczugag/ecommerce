import express from "express";
import passport from "passport";

import methods from "../../controllers/userAuth";

const auth = (router: express.Router) => {
    router.get(
        "/auth/current_user",
        passport.authenticate("jwt", { session: false }),
        (req, res) => res.json(req.user)
    );

    router.get(
        "/auth/current_user",
        passport.authenticate("jwt", { session: false }),
        methods.readCurrentUser
    );

    router.get("/auth/refresh", methods.refreshToken);

    router.get("/auth/logout", methods.logout);

    router.post("/auth/login", methods.login);

    router.post("/auth/register", methods.register);
};

export default auth;
