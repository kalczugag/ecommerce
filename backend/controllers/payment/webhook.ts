import express from "express";
import { OrderModel } from "../../models/Order";
import { CartModel } from "../../models/Cart";
import type { Order } from "../../types/Order";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const stripeWebhook = async (
    req: express.Request,
    res: express.Response
) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log("webhook verified", event.type);
    } catch (error: any) {
        console.error(error);
        return res
            .status(400)
            .json({ error: `Webhook Error: ${error.message}` });
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const { orderId, userId } = session.metadata!;

            if (orderId && userId) {
                await updateOrder(orderId, "confirmed", "paid");
                await clearCart(userId);
            }

            break;

        case "payment_intent.succeeded":
            const paymentIntent = event.data.object as Stripe.PaymentIntent;

            break;

        case "payment_intent.payment_failed":
            const failedPayment = event.data.object as Stripe.PaymentIntent;

            if (failedPayment.metadata.orderId) {
                await updateOrder(
                    failedPayment.metadata.orderId,
                    "cancelled",
                    "failed"
                );
            }

            break;

        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};

const updateOrder = async (
    orderId: string,
    status: Order["status"],
    paymentStatus: Order["paymentStatus"]
) => {
    try {
        await OrderModel.findByIdAndUpdate(
            orderId,
            {
                status,
                paymentStatus,
            },
            {
                new: true,
                runValidators: true,
            }
        );
    } catch (error) {
        console.error("Error updating order:", error);
    }
};

const clearCart = async (userId: string) => {
    try {
        await CartModel.findOneAndUpdate(
            { _user: userId },
            { $set: { _products: [] } },
            { new: true }
        );
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};
