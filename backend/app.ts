import express from "express";
import { summaryCronJob } from "./config/cronJob";

import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import appRouter from "./routes/v1";

import "./config/passport";
import "./config/cron";
import { UserModel } from "./models/User";
import { CartModel } from "./models/Cart";
import { CategoryModel } from "./models/Categories";

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

app.post("/trigger-summary-cron", (req, res) => {
    summaryCronJob();
    res.status(200).send("Summary cron job triggered");
});

const addCartsToUsers = async () => {
    try {
        // Fetch all users
        const users = await UserModel.updateMany(
            {},
            {
                $rename: { role: "_role" },
            }
        );

        console.log("Finished.");
    } catch (error) {
        console.error("Error adding carts to users:", error);
    }
};

// addCartsToUsers();

async function updateDocuments() {
    try {
        const categories = await CategoryModel.insertMany([]);

        console.log("finish ");
    } catch (err) {
        console.error("Error updating documents:", err);
    }
}

// updateDocuments();

export default app;
