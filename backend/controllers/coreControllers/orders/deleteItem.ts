import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { BaseItemModel } from "../../../models/BaseItem";

export const deleteOrderItem = async (
    req: express.Request<{ orderId: string; itemId: string }>,
    res: express.Response
) => {
    const { orderId, itemId } = req.params;

    if (!isValidObjectId(orderId) || !isValidObjectId(itemId)) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    "Invalid order or order item ID format",
                    400
                )
            );
    }

    try {
        const deletedOrderItem = await OrderModel.findOneAndUpdate(
            { _id: orderId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );

        if (!deletedOrderItem) {
            return res
                .status(404)
                .json(errorResponse(null, "Order item not found", 404));
        }

        await BaseItemModel.findOneAndDelete({ _id: itemId });

        return res.json(successResponse(deletedOrderItem));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
