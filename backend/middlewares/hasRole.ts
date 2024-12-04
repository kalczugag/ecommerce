import express from "express";
import type { User } from "../types/User";

export const hasRole =
    (requiredRole: string | "all") =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = req.user as User;

        if (
            !user ||
            !user.role ||
            typeof user.role !== "object" ||
            !user.role.name.includes(requiredRole)
        ) {
            return res.status(403).json({ error: "Access denied." });
        }

        if (requiredRole === "all") {
            return next();
        }

        next();
    };
