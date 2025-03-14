import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";

export const deleteOrder = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid order ID format", 400));
    }

    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res
                .status(404)
                .json(errorResponse(null, "Order not found", 404));
        }

        return res.json(successResponse(deletedOrder));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
