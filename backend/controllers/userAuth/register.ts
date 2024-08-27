import express from "express";
import ms from "ms";
import { genPassword, issueJWT } from "@/utlis/helpers";
import schema from "./schemaValidate";
import { UserModel } from "@/models/User";
import { RoleModel } from "@/models/Role";
import { User } from "@/types/User";

interface RegisterRequestBody extends User {
    password: string;
}

export const register = async (
    req: express.Request<{}, {}, RegisterRequestBody>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const { salt, hash } = genPassword(req.body.password);

        let defaultRole = await RoleModel.findOne({ name: "client" }).exec();

        if (!defaultRole) {
            defaultRole = await RoleModel.create({
                name: "client",
                permissions: ["read"],
            });
        }

        const newUser = new UserModel({
            ...req.body,
            hash,
            salt,
            role: defaultRole._id,
        });

        await newUser.save();

        const accessToken = issueJWT(newUser, "access");
        const refreshToken = issueJWT(newUser, "refresh");

        const refreshTokenMaxAge = ms(refreshToken.expires);

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: refreshTokenMaxAge,
        });

        return res.status(201).json({
            success: true,
            isAdmin: false,
            ...accessToken,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            if (err.message.includes("duplicate key")) {
                return res.status(400).json({ error: "Email already exists" });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};
