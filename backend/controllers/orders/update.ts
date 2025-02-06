import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import { CartModel } from "../../models/Cart";
import { PaymentModel } from "../../models/Order/Payment";
import { ShipmentModel } from "../../models/Order/Shipment";
import type { Order } from "../../types/Order";
import type { User } from "../../types/User";

export const updateOrder = async (
    req: express.Request<{ id: string }, {}, Order>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid order ID format" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        if (updates.status === "canceled") {
            const payment = await PaymentModel.findOne({ _order: id });

            if (!payment) {
                const updatedOrder = await OrderModel.findByIdAndUpdate(
                    id,
                    {
                        status: "canceled",
                    },
                    { new: true }
                );

                if (!updatedOrder) {
                    return res.status(404).json({ error: "Order not found" });
                }

                return res.status(200).json({
                    msg: "Order updated successfully",
                    data: updatedOrder,
                });
            }
        }

        let shipment;
        if (updates._shipment) {
            console.log(updates);
            shipment = new ShipmentModel(updates._shipment);
            await shipment.save();

            if (!Array.isArray(updates._shipment)) {
                updates._shipment = [];
            }

            (updates._shipment as string[]).push(shipment._id.toString());
        }

        const order = await OrderModel.findById(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...updates,
                    ...(!updates.status && {
                        total:
                            order.subTotal -
                            order.discount +
                            order.tax +
                            shipment?.shippingCost!,
                    }),
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.status(200).json({
            msg: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
