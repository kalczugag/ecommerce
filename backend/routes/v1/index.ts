import express from "express";

import auth from "./auth";

const router = express.Router();

export default (): express.Router => {
    auth(router);

    return router;
};
