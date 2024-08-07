import express from "express";

import auth from "./auth";
import products from "./products";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    products(router);

    return router;
};
