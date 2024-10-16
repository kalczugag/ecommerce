import express from "express";

import methods from "@/controllers/payment";

const payment = (router: express.Router) => {
    router.post("/checkout", methods.create);
};

export default payment;
