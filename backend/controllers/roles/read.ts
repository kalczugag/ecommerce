import express from "express";
import { RoleModel } from "@/models/Role";

export const getAllRoles = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const roles = await RoleModel.find();

        if (!roles || roles.length === 0) {
            return res.status(404).json({ error: "No roles found" });
        }

        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
