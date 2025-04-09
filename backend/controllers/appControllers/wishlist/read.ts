import express from "express";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { WishlistModel } from "../../../models/Wishlist";
import type { User } from "../../../types/User";

export const getWishlist = async (
    req: express.Request<{}, {}, {}, any>,
    res: express.Response
) => {
    const user = req.user as User;

    try {
        const wishlist = await WishlistModel.findById(user._wishlist);

        if (!wishlist) {
            return res
                .status(404)
                .json(errorResponse(null, "No wishlist found", 404));
        }

        return res.status(200).json(successResponse(wishlist));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
