import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { PaymentModel } from "../../../models/Order/Payment";

export const deletePayment = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid payment ID format", 400));
    }

    try {
        const deletedPayment = await PaymentModel.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res
                .status(404)
                .json(errorResponse(null, "Product not found", 404));
        }

        await OrderModel.findOneAndUpdate(
            { _id: deletedPayment._order },
            { $pull: { payments: deletedPayment._id } }
        ).exec();

        return res.json(successResponse(deletedPayment));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
