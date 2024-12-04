import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../models/Order";
import { UserModel } from "../models/User";
import type { User } from "../types/User";
import type { Role } from "../types/Role";

type OwnModels = "order" | "review" | "user";

export const isOwner =
    (model: OwnModels) =>
    async (
        req: express.Request<{ id: string }>,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const user = req.user as User;

        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid order ID format" });
        }

        if ((user.role as Role).name.includes("admin")) {
            return next();
        }

        try {
            let result;

            if (model === "order") {
                result = await OrderModel.findById(id);

                if (!result) {
                    return res.status(404).json({ error: "Order not found" });
                }

                if (result._user.toString() !== user._id?.toString()) {
                    return res.status(403).json({ error: "Access denied." });
                }
            }

            if (model === "user") {
                result = await UserModel.findById(id);

                if (!result) {
                    return res.status(404).json({ error: "User not found" });
                }

                if (result._id.toString() !== user._id?.toString()) {
                    return res.status(403).json({ error: "Access denied." });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }

        return next();
    };
