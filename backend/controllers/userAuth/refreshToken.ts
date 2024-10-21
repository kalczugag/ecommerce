import express from "express";
import jwt from "jsonwebtoken";
import ms from "ms";
import { issueJWT } from "../../utils/helpers";
import { UserModel } from "../../models/User";

export const refreshToken = async (
    req: express.Request,
    res: express.Response
) => {
    const cookies = req.cookies;

    if (!cookies || !cookies.refreshToken) {
        return res.status(403).json({ error: "Refresh token required" });
    }

    let refreshToken = cookies.refreshToken;

    if (refreshToken.startsWith("Bearer ")) {
        refreshToken = refreshToken.slice(7);
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN!);

        const user = await UserModel.findById(decoded.sub)
            .select("+refreshToken")
            .populate("role")
            .exec();

        if (!user) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }

        if (user.refreshToken.token !== cookies.refreshToken) {
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
            isAdmin: user.role.name === "admin",
            userId: user._id,
            cartId: user._cart,
            ...accessToken,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(403)
            .json({ error: "Invalid or expired refresh token" });
    }
};
