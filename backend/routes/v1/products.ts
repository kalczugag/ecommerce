import express from "express";
import passport from "passport";

import {
    getAllProducts,
    addProduct,
    getProductById,
} from "@/controllers/products";

const products = (router: express.Router) => {
    router.get(
        "/products",
        getAllProducts,
        passport.authenticate("jwt", { session: false })
    );
    router.get(
        "/products/:id",
        getProductById,
        passport.authenticate("jwt", { session: false })
    );
    router.post(
        "/products",
        addProduct,
        passport.authenticate("jwt", { session: false })
    );
};

export default products;
