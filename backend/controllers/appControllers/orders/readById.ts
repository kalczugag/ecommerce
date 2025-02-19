import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { enhanceShipments } from "../../../utils/enhanceShipments";

export const getOrderById = async (
    req: express.Request<{ id: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next(errorResponse(null, "Order ID is required", 400));
    }

    try {
        const order = await OrderModel.findById(id)
            .populate("_user", "firstName lastName email phone address")
            .populate("payments")
            .populate({
                path: "shipments",
            })
            .populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            })
            .exec();

        if (!order) {
            return next(errorResponse(null, "Order not found", 404));
        }

        const enhancedShipments = await enhanceShipments(order.shipments);

        const enhancedOrder = {
            ...order.toObject(),
            shipments: enhancedShipments,
        };

        return res.status(200).json(successResponse(enhancedOrder));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
