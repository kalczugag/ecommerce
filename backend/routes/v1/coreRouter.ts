import express from "express";

import orders from "./coreRoutes/orders";
import payments from "./coreRoutes/payments";

const router = express.Router();

export default (): express.Router => {
    orders(router);
    payments(router);

    return router;
};
