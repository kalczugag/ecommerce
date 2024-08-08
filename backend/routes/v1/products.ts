import express from "express";
import passport from "passport";

import methods from "@/controllers/products";

const products = (router: express.Router) => {
    router.get(
        "/products",
        methods.read,
        passport.authenticate("jwt", { session: false })
    );
    router.get(
        "/products/:id",
        methods.readById,
        passport.authenticate("jwt", { session: false })
    );
    router.post(
        "/products",
        methods.create,
        passport.authenticate("jwt", { session: false })
    );
    router.patch(
        "/products/:id",
        methods.update,
        passport.authenticate("jwt", { session: false })
    );
    router.delete(
        "/products/:id",
        methods.delete,
        passport.authenticate("jwt", { session: false })
    );
};

export default products;
