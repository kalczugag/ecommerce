import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/cart";

const cart = (router: express.Router) => {
    router.get(
        "/cart",
        passport.authenticate("jwt", { session: false }),
        methods.read
    );

    router.patch(
        "/cart/:id",
        passport.authenticate("jwt", { session: false }),
        methods.update
    );
};

export default cart;
