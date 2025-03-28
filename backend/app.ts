import express from "express";
import { errorHandler } from "./middlewares";

import cors from "cors";

import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1/appRouter";
import coreRouter from "./routes/v1/coreRouter";

import "./config/passport";

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
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

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

app.use(errorHandler);

export default app;
