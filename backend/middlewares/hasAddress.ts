import express from "express";
import { User } from "@/types/User";

export const hasAddress = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const user = req.user as User;

    if (
        user.address &&
        !user.address.street &&
        !user.address.city &&
        !user.address.postalCode &&
        !user.address.country
    ) {
        return res.status(403).json({ error: "Address is required" });
    }

    next();
};
