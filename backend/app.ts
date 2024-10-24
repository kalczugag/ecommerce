import express from "express";
import { summaryCronJob } from "./config/cronJob";

import cors, { CorsOptions } from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1";

import "./config/passport";
import "./config/cron";

const allowedOrigins: string[] = [
    "https://ecom-admin-12.netlify.app",
    "https://ecommerce-frontend-six-black.vercel.app",
];

const app = express();

app.use(
    cors({
        origin: ["https://ecom-admin-12.netlify.app"],
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

app.post("/trigger-summary-cron", (req, res) => {
    summaryCronJob();
    res.status(200).send("Summary cron job triggered");
});

export default app;
