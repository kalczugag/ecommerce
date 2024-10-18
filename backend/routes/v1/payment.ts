import express from "express";

import methods from "@/controllers/payment";

const payment = (router: express.Router) => {
    router.post("/checkout", methods.create);
    router.post(
        "/webhook",
        express.raw({ type: "application/json" }),
        methods.webhook
    );
};

export default payment;
