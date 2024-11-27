import express from "express";
import type { Order } from "../../types/Order";
import type { Product } from "../../types/Product";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const createCheckoutSession = async (
    req: express.Request<{}, {}, Order>,
    res: express.Response
) => {
    const order = req.body;
    const url = process.env.REDIRECT_URL;

    if (!order) {
        return res.status(400).json({ error: "No order provided" });
    }

    let lineItems = order.items.map((item) => {
        const productData = item.product as Product;
        const unitPrice = productData.discountPercent
            ? productData.discountedPrice!
            : productData.price!;

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: productData.title,
                    images: productData.imageUrl,
                },
                unit_amount: unitPrice * 100,
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "paypal"],
            mode: "payment",
            line_items: lineItems,
            metadata: {
                userId: order._user._id!,
                orderId: order._id!,
                email: order._user.email!,
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: order.deliveryCost * 100,
                            currency: "usd",
                        },
                        display_name: "Free Shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 3,
                            },
                        },
                    },
                },
            ],
            success_url: `${url}/checkout/${order._id}/success`,
            cancel_url: `${url}/checkout/${order._id}/summary`,
        });

        return res.json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
