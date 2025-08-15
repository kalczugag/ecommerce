import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/userAuth";

interface ProviderProps {
    [key: string]: {
        strategy: string;
        scope: string[] | string;
    };
}

const providers: ProviderProps = {
    google: { strategy: "google", scope: ["email", "profile"] },
    facebook: {
        strategy: "google",
        scope: ["id", "displayName", "email", "picture"],
    },
};

const auth = (router: express.Router) => {
    router.get(
        "/auth/current_user",
        passport.authenticate(["jwt", "google", "facebook"], {
            session: false,
        }),
        methods.readCurrentUser
    );

    router.get("auth/:provider", (req, res, next) => {
        const p = providers[req.params.provider];
        if (!p) return res.status(404).json({ error: "Provider not found" });

        console.log("provider found");
    });

    router.get("/auth/:provider/callback", (req, res, next) => {});

    router.get("/auth/refresh", methods.refreshToken);

    router.get("/auth/logout", methods.logout);

    router.post("/auth/login", methods.login);

    router.post("/auth/register", methods.register);
};

export default auth;
