import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { RoleModel } from "../../../models/Role";

export const getAllRoles = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const roles = await RoleModel.find();

        if (!roles || roles.length === 0) {
            return res.status(404).json(errorResponse(null, "Roles not found"));
        }

        return res.status(200).json(successResponse(roles));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
