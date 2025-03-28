import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/reviews";

const reviews = (router: express.Router) => {
    router.get("/reviews/:id", methods.readByProductId);

    router.post(
        "/reviews",
        passport.authenticate("jwt", { session: false }),
        methods.create
    );
};

export default reviews;
