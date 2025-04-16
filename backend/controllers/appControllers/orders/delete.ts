import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { CounterModel } from "../../../models/Counter";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { PaymentModel } from "../../../models/Order/Payment";

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

        await CounterModel.findById("orderNumber").updateOne({
            $inc: { seq: -1 },
        });

        if (deletedOrder.shipments.length > 0) {
            console.log("shipment");
            await ShipmentModel.deleteMany({
                _id: { $in: deletedOrder.shipments },
            });
        }

        if (deletedOrder.payments.length > 0) {
            console.log("payment");
            await PaymentModel.deleteMany({
                _id: { $in: deletedOrder.payments },
            });
        }

        return res.json(successResponse(deletedOrder));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
