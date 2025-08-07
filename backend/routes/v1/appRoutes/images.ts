import express from "express";
import passport from "passport";

import methods from "../../../controllers/appControllers/images";

const images = (router: express.Router) => {
    router.get(
        "/images/auth",
        passport.authenticate(["jwt", "google"], { session: false }),
        methods.auth
    );
};

export default images;
