import express from "express";
import { validPassword, genPassword, issueJWT } from "@/utlis/helpers";
import schema from "./schemaValidate";
import { UserModel } from "@/models/User";
import { RoleModel } from "@/models/Role";
import { User } from "@/types/User";

interface RegisterRequestBody extends User {
    password: string;
}

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const existingUser = await UserModel.findOne({ email }).select(
            "+hash +salt"
        );

        if (!existingUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = validPassword(
            password,
            existingUser.hash,
            existingUser.salt
        );

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = issueJWT(existingUser);

        return res.status(200).json({
            success: true,
            ...token,
        });
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

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

        const token = issueJWT(newUser);

        return res.status(201).json({
            success: true,
            ...token,
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
