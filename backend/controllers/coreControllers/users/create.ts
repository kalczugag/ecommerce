import express from "express";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { UserModel } from "../../../models/User";
import type { User } from "../../../types/User";
import { RoleModel } from "../../../models/Role";

export const createUser = async (
    req: express.Request<{}, {}, User>,
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

    let params = req.body;

    try {
        let defaultRole: any;
        if (!params._role) {
            defaultRole = await RoleModel.findOne({ name: "client" }).exec();
        }

        const role = params._role ? params._role : defaultRole._id;

        const newUser = new UserModel({
            ...params,
            _role: role,
        });

        await newUser.save();

        return res
            .status(201)
            .json(successResponse(newUser, "User added successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
