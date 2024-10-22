import express from "express";
import { summaryCronJob } from "./config/cronJob";

import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1";

import "./config/passport";
import "./config/cron";

const app = express();

app.use(
    cors({
        origin: [
            "https://ecommerce-cnxq84jlu-kalczugags-projects.vercel.app/",
            "https://ecommerce-a3he.vercel.app/",
        ],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
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

app.use("/api/v1", cors(), appRouter());

app.post("/trigger-summary-cron", (req, res) => {
    summaryCronJob();
    res.status(200).send("Summary cron job triggered");
});

export default app;
