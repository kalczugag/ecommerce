import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { BaseItemModel } from "../../../models/BaseItem";

export const deleteBaseItem = async (
    req: express.Request<{ id: string; orderId: string }>,
    res: express.Response
) => {
    const { id, orderId } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid item ID format", 400));
    }

    if (!orderId) {
        return res
            .status(400)
            .json(errorResponse(null, "No order ID provided", 400));
    }

    try {
        const deletedBaseItem = await BaseItemModel.findByIdAndDelete(id);

        if (!deletedBaseItem) {
            return res
                .status(404)
                .json(errorResponse(null, "Item not found", 404));
        }

        await OrderModel.findOneAndUpdate(
            { _id: orderId },
            { $pull: { items: deletedBaseItem._id } }
        ).exec();

        return res.json(successResponse(null, "Item deleted"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
