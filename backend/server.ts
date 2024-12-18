import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import mongoose from "mongoose";
import http from "http";
import Redis from "ioredis";

import app from "./app";

if (!process.env.DATABASE) {
    throw new Error("DATABASE environment variable is not set");
}
// if (!process.env.REDIS_PORT || !process.env.REDIS_HOST) {
//     throw new Error("REDIS_PORT or REDIS_HOST environment variable is not set");
// }

const redisClient = new Redis();

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

const mongo_url = process.env.DATABASE;
mongoose.Promise = Promise;
mongoose.connect(mongo_url);
mongoose.connection.on("error", (error: Error) => console.log(error));

export { redisClient };

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
    console.log("Shutting down...");
    if (redisClient) await redisClient.quit();
    mongoose.connection.close();
    process.exit(0);
});
