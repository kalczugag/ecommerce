import express from "express";

import methods from "@/controllers/userAuth";

const auth = (router: express.Router) => {
    router.get("/auth/refresh", methods.refreshToken);
    router.get("/auth/logout", methods.logout);
    router.post("/auth/login", methods.login);
    router.post("/auth/register", methods.register);
};

export default auth;
