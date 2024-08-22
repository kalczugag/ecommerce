import express from "express";
import jwt from "jsonwebtoken";
import ms from "ms";
import { issueJWT } from "@/utlis/helpers";
import { UserModel } from "@/models/User";

export const refreshToken = async (
    req: express.Request,
    res: express.Response
) => {
    const cookies = req.cookies;

    if (!cookies || !cookies.refreshToken) {
        return res.status(403).json({ error: "Refresh token required" });
    }

    const refreshToken = cookies.refreshToken;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN!);

        const user = await UserModel.findById(decoded.sub);

        if (!user) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }

        if (user.refreshToken.token !== refreshToken) {
            return res
                .status(403)
                .json({ error: "Invalid or expired refresh token" });
        }

        const accessToken = issueJWT(user, "access");

        const newRefreshToken = issueJWT(user, "refresh");
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: ms(newRefreshToken.expires),
        });

        return res.status(200).json({
            success: true,
            accessToken: accessToken.token,
            expiresIn: accessToken.expires,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(403)
            .json({ error: "Invalid or expired refresh token" });
    }
};
