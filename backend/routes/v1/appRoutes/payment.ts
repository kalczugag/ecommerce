import express from "express";
import bodyParser from "body-parser";

import methods from "../../../controllers/appControllers/payment";

const payment = (router: express.Router) => {
    router.post("/checkout", methods.create);
    router.post(
        "/webhook",
        bodyParser.raw({ type: "application/json" }),
        methods.webhook
    );
};

export default payment;
