import express from "express";

import orders from "./coreRoutes/orders";
import payments from "./coreRoutes/payments";
import users from "./coreRoutes/users";
import shipments from "./coreRoutes/shipments";
import baseItems from "./coreRoutes/baseItems";

const router = express.Router();

export default (): express.Router => {
    orders(router);
    payments(router);
    shipments(router);
    users(router);
    baseItems(router);

    return router;
};
