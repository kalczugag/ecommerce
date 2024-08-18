import express from "express";

import auth from "./auth";
import users from "./user";
import roles from "./roles";
import products from "./products";
import orders from "./orders";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    roles(router);
    products(router);
    orders(router);

    return router;
};
