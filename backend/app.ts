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
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://admin-ecommerce-df8fb1.netlify.app",
                "https://frontend-ecommerce-df8fb1.netlify.app",
                "http://localhost:3000",
                "http://localhost:5173",
                "http://localhost:4173",
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

// if (process.env.NODE_ENV === "production") {
//     const clientBuildPath = path.join(__dirname, "../../frontend/build");

//     app.use(
//         express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
//     );

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(clientBuildPath, "index.html"));
//     });
// }

export default app;
