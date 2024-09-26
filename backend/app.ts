import "module-alias/register";
import express from "express";
import { summaryCronJob } from "./config/cronJob";
import { ProductModel } from "./models/Product";

import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1";

import "./config/passport";
import "./config/cron";

const app = express();

app.use(cors());
app.use(cookieParser());
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
