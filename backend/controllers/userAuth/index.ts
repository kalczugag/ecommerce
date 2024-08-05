import express from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../../utlis/helpers";
import { User } from "../../models/User";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
            },
            process.env.SECRET_KEY!,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            data: { token },
        });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, gender, email, password } = req.body;

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
            process.env.SECRET_KEY!,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            success: true,
            data: { token },
        });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};
