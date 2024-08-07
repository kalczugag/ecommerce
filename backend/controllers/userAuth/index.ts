import express from "express";
import { validPassword, genPassword, issueJWT } from "@/utlis/helpers";
import { User } from "@/models/User";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const existingUser = await User.findOne({ email }).select(
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

export const register = async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, gender, email, password } = req.body;

    if (!firstName || !lastName || !gender || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const { salt, hash } = genPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            gender,
            email,
            hash,
            salt,
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
        return res.sendStatus(500);
    }
};
