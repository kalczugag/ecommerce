import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { RoleModel } from "../../../models/Role";
import { Permission } from "../../../types/Role";

export const createRole = async (
    req: express.Request<{}, {}, Permission[]>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    try {
        const newRole = new RoleModel(req.body);

        await newRole.save();

        return res
            .status(201)
            .json(successResponse(newRole, "Role added successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
