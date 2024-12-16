import express from "express";
import schema from "./schemaValidate";
import { UserModel } from "../../models/User";
import type { User } from "../../types/User";
import { genPassword } from "../../utils/helpers";
import { RoleModel } from "../../models/Role";

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

    let params = req.body;

    try {
        const { salt, hash } = genPassword(params.password);

        let defaultRole: any;
        if (!params._role) {
            defaultRole = await RoleModel.findOne({ name: "client" }).exec();
        }

        const role = params._role ? params._role : defaultRole._id;

        const newUser = new UserModel({
            ...params,
            hash,
            salt,
            role,
        });

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
