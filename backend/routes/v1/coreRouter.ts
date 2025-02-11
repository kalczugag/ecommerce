import express from "express";

import orders from "./coreRoutes/orders";

const router = express.Router();

export default (): express.Router => {
    orders(router);

    return router;
};
