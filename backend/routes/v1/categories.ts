import express from "express";
import passport from "passport";

import methods from "@/controllers/categories";

const categories = (router: express.Router) => {
    router.get(
        "/categories",
        passport.authenticate("jwt", { session: false }),
        methods.read
    );
};

export default categories;
