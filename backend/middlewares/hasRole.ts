import express from "express";
import { User } from "@/types/User";

export const hasRole =
    (requiredRole: string) =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = req.user as User;

        if (!user || !requiredRole.includes(user.role.name)) {
            return res.status(403).json({ error: "Access denied." });
        }

        next();
    };
