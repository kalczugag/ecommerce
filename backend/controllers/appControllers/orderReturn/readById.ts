import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ReturnModel } from "../../../models/Order/Return";

export const getReturnById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid return ID format", 400));
    }

    try {
        const returnedOrder = await ReturnModel.findById(id)
            .populate("_user", "firstName lastName email phone address")
            .populate("refundPayments")
            .populate("_order", "items")
            .exec();

        if (!returnedOrder) {
            return res
                .status(404)
                .json(errorResponse(null, "Return not found"));
        }

        return res.status(200).json(successResponse(returnedOrder));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
