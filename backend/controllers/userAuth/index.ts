import express from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../../utlis/helpers";
import { User } from "../../models/User";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id.toString(),
                email: existingUser.email,
            },
            process.env.PRIVATE_KEY!,
            { expiresIn: "10h" }
        );

        return res.status(200).json({
            success: true,
            data: { token },
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
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            firstName,
            lastName,
            gender,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
            },
            process.env.PRIVATE_KEY!,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            success: true,
            data: { token },
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
