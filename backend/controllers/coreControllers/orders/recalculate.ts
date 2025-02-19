import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";
import { PaymentModel } from "../../../models/Order/Payment";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { BaseItemModel } from "../../../models/BaseItem";

const TAX_RATE = 0;

export const recalculateOrder = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id: orderId } = req.params;

    if (!isValidObjectId(orderId)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid order ID format", 400));
    }

    try {
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res
                .status(404)
                .json(errorResponse(null, "Order not found", 404));
        }

        const baseItems = await BaseItemModel.find({
            _id: { $in: order.items },
        });
        let subTotal = 0;

        for (const baseItem of baseItems) {
            const itemTotal = baseItem.unitPrice * baseItem.quantity;
            subTotal += itemTotal;
        }

        const shipments = await ShipmentModel.find({
            _id: { $in: order.shipments },
        });
        const shippingCost = shipments.reduce(
            (total, shipment) => total + shipment.shippingCost,
            0
        );

        const tax = subTotal * TAX_RATE;
        const total = subTotal + tax + shippingCost - order.discount;

        order.subTotal = subTotal;
        order.tax = tax;
        order.total = total;
        await order.save();

        const payments = await PaymentModel.find({
            _id: { $in: order.payments },
        });

        let capturedAmount = 0;
        payments.forEach((payment) => {
            if (payment.paymentStatus === "completed") {
                capturedAmount += payment.amount;
            }
        });

        const remainingBalance = total - capturedAmount;

        if (remainingBalance > 0) {
            const newPayment = new PaymentModel({
                _order: order._id,
                paymentMethod: "pending",
                amount: remainingBalance,
            });

            await newPayment.save();

            (order.payments as string[]).push(newPayment._id.toString());
        }

        await order.save();

        return res
            .status(200)
            .json(
                successResponse(
                    null,
                    `Order recalculated successfully ${
                        remainingBalance > 0 &&
                        "and a new pending payment has been created"
                    }`,
                    200
                )
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
