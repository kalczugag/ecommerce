import express from "express";
import { CartModel } from "../../models/Cart";
import type { User } from "../../types/User";

export const getCartItems = async (
    req: express.Request<{}, {}, {}, { onlyCount: string }>,
    res: express.Response
) => {
    const user = req.user as User;
    const onlyCount = req.query.onlyCount === "true";

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    if (user && !user._cart) {
        return res.status(404).json({ error: "Cart not found" });
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
            return res.status(404).json({ error: "No cart data found" });
        }

        const result = onlyCount
            ? { _id: cart?._id, count: cart?.items.length }
            : cart;

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
