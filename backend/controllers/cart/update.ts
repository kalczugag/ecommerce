import express from "express";
import { isValidObjectId } from "mongoose";
import { CartModel } from "@/models/Cart";
import type { Item } from "@/types/Order";

interface BodyProps {
    action: "add" | "delete";
    productId: string;
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
    _id: string;
}

export const updateCart = async (
    req: express.Request<{}, {}, BodyProps>,
    res: express.Response
) => {
    const { action, productId, color, size, unitPrice, quantity, _id } =
        req.body;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ error: "Cart ID is required" });
    }

    try {
        const cart = await CartModel.findById(_id);

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const products = cart._products as Item[];

        if (action === "add") {
            const itemExists = products.find(
                (item) =>
                    item.product?.toString() === productId &&
                    item.color === color &&
                    item.size === size
            );

            if (itemExists) {
                itemExists.quantity += quantity;
            } else {
                products.push({
                    product: productId,
                    color,
                    size,
                    unitPrice,
                    quantity,
                } as Item);
            }
            await cart.save();

            return res
                .status(200)
                .json({ msg: "Product added to cart", data: cart });
        }

        if (action === "delete") {
            cart._products = products.filter(
                (item) =>
                    !(
                        item.product?.toString() === productId &&
                        item.color === color &&
                        item.size === size
                    )
            );
            await cart.save();

            return res
                .status(200)
                .json({ msg: "Product removed from cart", data: cart });
        }

        return res.status(400).json({ error: "Invalid action" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
