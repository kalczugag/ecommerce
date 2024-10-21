import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config({ path: [".env.local", ".env"] });

if (!process.env.DATABASE) {
    throw new Error("DATABASE environment variable is not set");
}

const mongo_url = process.env.DATABASE;
mongoose.Promise = Promise;

mongoose.connect(mongo_url);
mongoose.connection.on("error", (error: Error) => console.error(error));

export default app;
