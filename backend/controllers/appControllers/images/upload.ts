import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const upload = async (req: express.Request, res: express.Response) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();

        return res.status(201).json(successResponse(authParams));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
