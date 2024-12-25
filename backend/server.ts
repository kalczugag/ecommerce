import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import mongoose from "mongoose";
import http from "http";

import app from "./app";

if (!process.env.DATABASE) {
    throw new Error("DATABASE environment variable is not set");
}

import "./config/redis";

const mongo_url = process.env.DATABASE;
mongoose.Promise = Promise;
mongoose.connect(mongo_url);
mongoose.connection.on("error", (error: Error) => console.log(error));

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
