import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { imagekit } from "../../../config/imagekitClient";

export const auth = async (req: express.Request, res: express.Response) => {
    try {
        const { token, expire, signature } =
            imagekit.getAuthenticationParameters();

        res.send({
            token,
            expire,
            signature,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
