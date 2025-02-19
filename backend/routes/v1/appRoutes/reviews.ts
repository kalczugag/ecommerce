import express from "express";

import methods from "../../../controllers/appControllers/reviews";

const reviews = (router: express.Router) => {
    router.get("/reviews/:id", methods.readByProductId);
};

export default reviews;
