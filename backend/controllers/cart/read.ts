import express from "express";
import { CartModel } from "../../models/Cart";
import type { User } from "../../types/User";

export const getCartItems = async (
    req: express.Request,
    res: express.Response
) => {
    const user = req.user as User;

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    if (user && !user._cart) {
        return res.status(404).json({ error: "Cart not found" });
    }

    try {
        const cart = await CartModel.findById(user._cart)
            .populate("_products.product")
            .exec();

        if (!cart) {
            return res.status(404).json({ error: "No cart data found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
