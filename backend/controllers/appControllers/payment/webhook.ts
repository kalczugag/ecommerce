import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import {
    handlePaymentIntentSucceeded,
    handlePaymentFailed,
} from "./caseFunctions";

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
            .json(errorResponse(null, "Invalid webhook signature", 400));
    }

    try {
        switch (event.type) {
            case "charge.refunded": {
                console.log("charge.refunded", event.data.object);
                break;
            }

            // case "checkout.session.completed": {
            //     handleCheckoutSessionCompleted(event.data.object);
            //     break;
            // }

            // case "checkout.session.expired": {
            //     handleCheckoutSessionExpired(event.data.object);
            //     break;
            // }

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

        res.json(successResponse({ received: true }));
    } catch (error) {
        console.error("Error handling webhook:", error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
