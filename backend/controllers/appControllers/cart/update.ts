import express from "express";
import { isValidObjectId } from "mongoose";
import { CartModel } from "../../../models/Cart";
import {
    handleAdd,
    handleChangeQuantity,
    handleClear,
    handleDelete,
} from "./caseFunctions";
import type { CartDocument } from "../../../types/Cart";
import type { Item } from "../../../types/Order";

interface BodyProps extends Item {
    action: "add" | "delete" | "clear" | "changeQuantity";
}

export interface HandleAddResult {
    success: boolean;
    message: string;
    updatedCart?: CartDocument;
}

// const itemExists = items.find(
//     (item) =>
//         item._product?.toString() === _product &&
//         item.color === color &&
//         item.size === size
// );

export const updateCart = async (
    req: express.Request<{ id: string }, {}, BodyProps>,
    res: express.Response
) => {
    const { id } = req.params;
    const { action, ...newItem } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Cart ID is required" });
    }

    try {
        const cart = await CartModel.findById(id).populate("items").exec();

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        let result;

        switch (action) {
            case "add": {
                result = await handleAdd(cart, newItem);

                break;
            }
            case "changeQuantity": {
                result = await handleChangeQuantity(cart, newItem);
                break;
            }
            case "delete": {
                result = await handleDelete(cart, newItem);
                break;
            }
            case "clear": {
                result = await handleClear(cart);
                break;
            }
            default:
                return res.status(400).json({ error: "Invalid action" });
        }

        if (result?.success) {
            return res
                .status(200)
                .json({ msg: result.message, data: result.updatedCart });
        } else {
            return res.status(500).json(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
