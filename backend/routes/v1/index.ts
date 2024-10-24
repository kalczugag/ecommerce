import express from "express";

import auth from "./auth";
import users from "./user";
import roles from "./roles";
import products from "./products";
import orders from "./orders";
import summary from "./summary";
import categories from "./categories";
import reviews from "./reviews";
import cart from "./cart";
import payment from "./payment";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    roles(router);
    products(router);
    orders(router);
    summary(router);
    categories(router);
    reviews(router);
    cart(router);
    payment(router);

    return router;
};
