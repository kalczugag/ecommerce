import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { WishlistModel } from "../../../models/Wishlist";
import type { User } from "../../../types/User";

export const updateWishlist = async (
    req: express.Request<{}, {}, { productId: string; type: "add" | "remove" }>,
    res: express.Response
) => {
    const { productId, type } = req.body;
    const user = req.user as User;

    if (!isValidObjectId(productId)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid product ID format", 400));
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const update =
            type === "add"
                ? { $addToSet: { products: productId } }
                : { $pull: { products: productId } };

        const updatedWishlist = await WishlistModel.findByIdAndUpdate(
            user._wishlist,
            update,
            { new: true, runValidators: true }
        );

        if (!updatedWishlist) {
            return res
                .status(404)
                .json(errorResponse(null, "Wishlist not found", 404));
        }

        return res
            .status(200)
            .json(
                successResponse(
                    { _id: updatedWishlist._id },
                    "Wishlist updated successfully"
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
