import express from "express";
import { isValidObjectId } from "mongoose";
import { CartModel } from "../../models/Cart";
import type { Item } from "../../types/Order";

interface BodyProps extends Item {
    action: "add" | "delete" | "clear" | "changeQuantity";
}

export const updateCart = async (
    req: express.Request<{}, {}, BodyProps>,
    res: express.Response
) => {
    const { action, _id, _product, color, size, quantity } = req.body;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ error: "Cart ID is required" });
    }

    try {
        const cart = await CartModel.findById(_id);
        let items = cart?.items as Item[];

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        if (action === "add") {
            const itemExists = items.find(
                (item) =>
                    item._product?.toString() === _product &&
                    item.color === color &&
                    item.size === size
            );

            if (itemExists) {
                itemExists.quantity += quantity;
            } else {
                items.push(req.body);
            }

            await cart.save();
            return res
                .status(200)
                .json({ msg: "Product added to cart", data: cart });
        }

        if (action === "delete") {
            items = items.filter(
                (item) =>
                    !(
                        item._product?.toString() === _product &&
                        item.color === color &&
                        item.size === size
                    )
            );

            await cart.save();
            return res
                .status(200)
                .json({ msg: "Product removed from cart", data: cart });
        }

        if (action === "clear") {
            items = [];

            await cart.save();
            return res.status(200).json({ msg: "Cart cleared", data: cart });
        }

        if (action === "changeQuantity") {
            const item = items.find(
                (item) =>
                    item._product?.toString() === _product &&
                    item.color === color &&
                    item.size === size
            );

            if (item) {
                item.quantity = quantity;
                await cart.save();

                return res
                    .status(200)
                    .json({ msg: "Product quantity updated", data: cart });
            }

            return res.status(404).json({ error: "Product not found in cart" });
        }

        return res.status(400).json({ error: "Invalid action" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
