import express from "express";
import { summaryCronJob } from "./config/cronJob";
import { errorHandler } from "./middlewares";

import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1/appRouter";
import coreRouter from "./routes/v1/coreRouter";

import "./config/passport";
import "./config/cron";

const app = express();

app.use(
    cors({
        origin: [
            "https://ecommerce-frontend-six-black.vercel.app",
            "https://ecommerce-admin-seven-cyan.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    })
);
app.options("*", cors());
app.use(cookieParser());

app.post(
    "/api/v1/webhook",
    bodyParser.raw({ type: "application/json" }),
    (req, res, next) => {
        next();
    }
);

app.use(bodyParser.json());

app.use("/api/v1", appRouter());
app.use("/api/v1/admin", coreRouter());

app.post("/trigger-summary-cron", (req, res) => {
    summaryCronJob();
    res.status(200).send("Summary cron job triggered");
});

app.use(errorHandler);

export default app;
