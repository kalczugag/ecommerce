import express from "express";
import { OrderModel } from "../../../models/Order";
import { CartModel } from "../../../models/Cart";
import { ProductModel } from "../../../models/Product";
import {
    handlePaymentIntentSucceeded,
    handleCheckoutSessionCompleted,
    handlePaymentFailed,
    handleCheckoutSessionExpired,
} from "./caseFunctions";
import { sendEmail } from "../../../config/nodemailer";
import { orderConfirmation } from "../../../emailTemplates/orderConfirmation";
import type { Order, Payment } from "../../../types/Order";
import type { Product } from "../../../types/Product";

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
    } catch (error: any) {
        console.error(error);
        return res
            .status(400)
            .json({ error: `Webhook Error: ${error.message}` });
    }

    try {
        switch (event.type) {
            case "charge.refunded": {
                console.log("charge.refunded", event.data.object);
                break;
            }

            case "checkout.session.completed": {
                handleCheckoutSessionCompleted(event.data.object);
                break;
            }

            case "checkout.session.expired": {
                handleCheckoutSessionExpired(event.data.object);
                break;
            }

            case "payment_intent.succeeded": {
                handlePaymentIntentSucceeded(event.data.object);
                break;
            }

            case "payment_intent.payment_failed": {
                handlePaymentFailed(event.data.object);
                break;
            }

            default:
                console.warn(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error("Error handling webhook:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateOrder = async (
    orderId: string,
    status: Order["status"],
    paymentStatus: Payment["paymentStatus"]
) => {
    try {
        await OrderModel.findByIdAndUpdate(
            orderId,
            { status, paymentStatus },
            { new: true, runValidators: true }
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

const updateProductQuantities = async (orderId: string) => {
    try {
        const order = await OrderModel.findById(orderId).populate(
            "items.product"
        );
        if (!order) throw new Error("Order not found");

        const updates = order.items.map(async (item: any) => {
            const product = await ProductModel.findById(
                (item._product as Product)._id
            );
            if (!product) return;

            const sizeIndex = product.size.findIndex(
                (s) => s.name === item.size
            );
            if (
                sizeIndex !== -1 &&
                product.size[sizeIndex].quantity >= item.quantity
            ) {
                product.size[sizeIndex].quantity -= item.quantity;
                await product.save();
            } else {
                console.warn(
                    `Insufficient stock for product ${product._id} (size: ${item.size})`
                );
            }
        });

        await Promise.all(updates);
    } catch (error) {
        console.error("Error updating product quantities:", error);
    }
};

const sendOrderConfirmationEmail = async (email: string, orderId: string) => {
    const subject = "Order Confirmation";

    try {
        const order = await OrderModel.findById(orderId)
            .populate({
                path: "_user",
                select: "firstName lastName phone address",
            })
            .populate("items.product")
            .exec();

        if (!order) throw new Error("Order not found");

        await sendEmail({
            to: email,
            subject,
            html: orderConfirmation(order),
        });

        console.log(`Order confirmation email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
