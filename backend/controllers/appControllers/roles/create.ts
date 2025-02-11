import express from "express";
import schema from "./schemaValidate";
import { RoleModel } from "../../../models/Role";
import { Permission } from "../../../types/Role";

export const createRole = async (
    req: express.Request<{}, {}, Permission[]>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newRole = new RoleModel(req.body);

        await newRole.save();

        return res.status(201).json({
            msg: "Role added successfully",
            data: newRole,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
