import express from "express";

import auth from "./appRoutes/auth";
import analyticsEvents from "./appRoutes/analyticsEvents";
import users from "./appRoutes/user";
import roles from "./appRoutes/roles";
import products from "./appRoutes/products";
import orders from "./appRoutes/orders";
import categories from "./appRoutes/categories";
import reviews from "./appRoutes/reviews";
import cart from "./appRoutes/cart";
import featuredCampaigns from "./appRoutes/featuredCampaigns";
import payment from "./appRoutes/payment";
import deliveryMethods from "./appRoutes/deliveryMethods";
import returns from "./appRoutes/returns";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    analyticsEvents(router);
    users(router);
    roles(router);
    products(router);
    orders(router);
    categories(router);
    reviews(router);
    cart(router);
    featuredCampaigns(router);
    payment(router);
    deliveryMethods(router);
    returns(router);

    return router;
};
