import express from "express";
import ms from "ms";
import { validPassword, issueJWT } from "../../utils/helpers";
import { UserModel } from "../../models/User";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const existingUser = await UserModel.findOne({ email })
            .select("+hash +salt +refreshToken")
            .populate("_role")
            .exec();

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

        const accessToken = issueJWT(existingUser, "access");
        const refreshToken = issueJWT(existingUser, "refresh");

        const refreshTokenMaxAge = ms(refreshToken.expires);

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: refreshTokenMaxAge,
        });

        return res.status(200).json({
            success: true,
            isAdmin:
                typeof existingUser._role === "object" &&
                existingUser._role.name === "admin",
            userId: existingUser._id,
            cartId: existingUser._cart,
            ...accessToken,
        });
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
