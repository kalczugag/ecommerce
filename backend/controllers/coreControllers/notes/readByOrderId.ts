import express from "express";
import { isValidObjectId } from "mongoose";
import { successResponse, errorResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";

export const getNotesByOrderId = async (
    req: express.Request<{ id: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next(errorResponse(null, "Order ID is required", 400));
    }

    try {
        const orderWithNotes = await OrderModel.findById(id)
            .populate({
                path: "payments",
                select: "notes",
                populate: {
                    path: "notes",
                    model: "Note",
                },
            })
            .populate({
                path: "shipments",
                select: "notes",
                populate: {
                    path: "notes",
                    model: "Note",
                },
            })
            .populate("notes")
            .select("payments shipments notes")
            .exec();

        if (!orderWithNotes) {
            return next(errorResponse(null, "Order not found", 404));
        }

        return res.status(200).json(successResponse(orderWithNotes));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
