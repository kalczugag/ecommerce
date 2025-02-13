import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
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
        return res
            .status(400)
            .json(errorResponse(null, "Invalid order ID format", 400));
    }

    try {
        const cart = await CartModel.findById(id).populate("items").exec();

        if (!cart) {
            return res
                .status(404)
                .json(errorResponse(null, "Cart not found", 404));
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
                return res
                    .status(400)
                    .json(errorResponse(null, "Invalid action", 400));
        }

        if (result?.success) {
            return res
                .status(200)
                .json(successResponse(result.updatedCart, result.message));
        } else {
            return res.status(500).json(errorResponse(null, result.message));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
