import express from "express";

import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());

// app.use("/api", router());

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../../frontend/build");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}

export default app;
