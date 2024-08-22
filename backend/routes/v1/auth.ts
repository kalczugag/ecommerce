import express from "express";
import passport from "passport";

import methods from "@/controllers/userAuth";

const auth = (router: express.Router) => {
    router.post("/auth/login", methods.login);
    router.post("/auth/register", methods.register);
    router.get("/auth/refresh", methods.refreshToken);
};

export default auth;
