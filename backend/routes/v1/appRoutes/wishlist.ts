import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/wishlist";

const wishlist = (router: express.Router) => {
    router.patch(
        "/wishlist",
        passport.authenticate(["jwt", "google"], { session: false }),
        methods.update
    );
};

export default wishlist;
