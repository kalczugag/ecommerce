import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { OrderModel } from "../../../models/Order";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const createCheckoutSession = async (
    req: express.Request<{}, {}, { orderId: string }>,
    res: express.Response
) => {
    const { orderId } = req.body;
    const url = process.env.REDIRECT_URL;

    if (!isValidObjectId(orderId)) {
        return res
            .status(400)
            .json(errorResponse(null, "Order ID is required", 400));
    }

    const order = await OrderModel.findById(orderId)
        .populate("_user", "firstName lastName email phone address")
        .populate("payments")
        .populate({
            path: "shipments",
            populate: {
                path: "items",
                model: "BaseItem",
            },
        })
        .populate({
            path: "items",
            populate: {
                path: "_product",
                model: "Product",
            },
        })
        .exec();

    if (!order) {
        return res.status(404).json(errorResponse(null, "Order not found"));
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.total * 100),
            currency: "usd",
            metadata: {
                orderId: order._id.toString(),
                userId: order._user.toString(),
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return res.json(
            successResponse({ clientSecret: paymentIntent.client_secret })
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
