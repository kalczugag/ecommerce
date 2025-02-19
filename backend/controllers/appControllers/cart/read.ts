import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CartModel } from "../../../models/Cart";
import type { User } from "../../../types/User";

export const getCartItems = async (
    req: express.Request<{}, {}, {}, { onlyCount: string }>,
    res: express.Response
) => {
    const user = req.user as User;
    const onlyCount = req.query.onlyCount === "true";

    if (!user) {
        return res.status(400).json(errorResponse(null, "User not found", 400));
    }

    if (user && !user._cart) {
        return res.status(404).json(errorResponse(null, "Cart not found", 404));
    }

    try {
        let cartQuery = CartModel.findById(user._cart);

        if (onlyCount) {
            cartQuery = cartQuery.select("items");
        } else {
            cartQuery = cartQuery.populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            });
        }

        const cart = await cartQuery.exec();

        if (!cartQuery) {
            return res
                .status(404)
                .json(errorResponse(null, "No cart data found", 404));
        }

        const result = onlyCount
            ? { _id: cart?._id, count: cart?.items.length }
            : cart;

        return res.status(200).json(successResponse(result));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
