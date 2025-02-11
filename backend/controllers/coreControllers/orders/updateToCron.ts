import express from "express";
import { OrderModel } from "../../../models/Order";
import { PaymentModel } from "../../../models/Order/Payment";
import { processPayments } from "../../../utils/processFunctions";
import type { Payment } from "../../../types/Order";

export const updateToCron = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const orders = await OrderModel.find({
            $or: [
                { payments: { $exists: false } },
                {
                    payments: { $exists: true },
                    $expr: {
                        $in: [
                            "$payments",
                            await PaymentModel.distinct("_id", {
                                paymentStatus: { $in: ["pending", "failed"] },
                            }),
                        ],
                    },
                },
            ],
        });

        if (!orders.length) {
            return res.status(200).json({ message: "No orders to update" });
        }

        const updates = await Promise.all(
            orders.map(async (order) => {
                const { paymentCount } = processPayments(
                    order.payments as Payment[]
                );
                if (paymentCount > 0) {
                    const payments = await PaymentModel.find({
                        _id: { $in: order.payments },
                    });

                    const hasFailedPayment = payments.some(
                        (payment) => payment.paymentStatus === "failed"
                    );
                    const hasPendingPayment = payments.some(
                        (payment) => payment.paymentStatus === "pending"
                    );

                    if (hasFailedPayment) {
                        order.status = "canceled";
                    } else if (hasPendingPayment) {
                        order.status = "placed";
                    }
                } else {
                    order.status = "pending payment";
                }

                return order.save();
            })
        );

        return res.status(200).json({
            message: "Orders updated successfully",
            updatedOrders: updates.length,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
