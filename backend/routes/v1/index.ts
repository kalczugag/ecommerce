import express from "express";

// app routes
import auth from "./appRoutes/auth";
import users from "./appRoutes/user";
import roles from "./appRoutes/roles";
import products from "./appRoutes/products";
import orders from "./appRoutes/orders";
import summary from "./appRoutes/summary";
import categories from "./appRoutes/categories";
import reviews from "./appRoutes/reviews";
import cart from "./appRoutes/cart";
import featuredCampaigns from "./appRoutes/featuredCampaigns";
import payment from "./appRoutes/payment";
import deliveryMethods from "./appRoutes/deliveryMethods";
import returns from "./appRoutes/returns";

// core routes
import coreOrders from "./coreRoutes/orders";

const router = express.Router();

export default (): express.Router => {
    // app routes
    auth(router);
    users(router);
    roles(router);
    products(router);
    orders(router);
    summary(router);
    categories(router);
    reviews(router);
    cart(router);
    featuredCampaigns(router);
    payment(router);
    deliveryMethods(router);
    returns(router);

    // core routes
    coreOrders(router);

    return router;
};
