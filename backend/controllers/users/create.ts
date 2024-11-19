import express from "express";
import schema from "./schemaValidate";
import { UserModel } from "../../models/User";
import type { User } from "../../types/User";

export const createUser = async (
    req: express.Request<{}, {}, User>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newUser = new UserModel(req.body);

        await newUser.save();

        return res.status(201).json({
            msg: "User added successfully",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
