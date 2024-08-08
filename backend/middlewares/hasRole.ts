import express from "express";
import { User } from "@/types/User";

export const hasRole =
    (requiredPermission: string) =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = req.user as User;

        if (!user || !user.role) {
            return res
                .status(401)
                .json({ error: "Unauthorized or No role assigned" });
        }

        try {
            const role = user.role;

            if (role.permissions.includes(requiredPermission)) {
                next();
            } else {
                return res
                    .status(403)
                    .json({ error: "Forbidden: Insufficient permissions" });
            }
        } catch (error) {
            console.error("Role check error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
