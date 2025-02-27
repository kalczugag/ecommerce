import express from "express";
import { isValidObjectId } from "mongoose";
import _ from "lodash";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { BaseItemModel } from "../../../models/BaseItem";
import { ProductModel } from "../../../models/Product";
import type { Item } from "../../../types/Order";

export const updateBaseItem = async (
    req: express.Request<{ id: string }, {}, Partial<Item>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid item ID format", 400));
    }

    const updates = _.omit(req.body, "_id");

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const baseItem = await BaseItemModel.findById(id);
        if (!baseItem) {
            return res
                .status(404)
                .json(errorResponse(null, "Item not found", 404));
        }

        if (baseItem._product) {
            const quantityDiff =
                (updates.quantity ?? baseItem.quantity) - baseItem.quantity;

            await ProductModel.updateOne(
                { _id: baseItem._product, "size.name": baseItem.size },
                {
                    $inc: {
                        "size.$.quantity": -quantityDiff,
                        quantity: -quantityDiff,
                    },
                }
            ).exec();
        }

        if (updates.unitPrice && updates.quantity) {
            updates.total = updates.unitPrice * updates.quantity;
        }

        const updatedBaseItem = await BaseItemModel.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedBaseItem) {
            return res
                .status(404)
                .json(errorResponse(null, "Item not found", 404));
        }

        return res
            .status(200)
            .json(successResponse("Item updated successfully"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
