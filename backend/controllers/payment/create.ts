import express from "express";
import type { Order } from "@/types/Order";
import type { Product } from "@/types/Product";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);
console.log(process.env.STRIPE_SECRET!);

export const createCheckoutSession = async (
    req: express.Request<{}, {}, Order>,
    res: express.Response
) => {
    const order = req.body;

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

    const deliveryCost = order.deliveryCost;
    if (deliveryCost > 0) {
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Fee",
                    images: [],
                },
                unit_amount: deliveryCost * 100,
            },
            quantity: 1,
        });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "paypal"],
            mode: "payment",
            line_items: lineItems,
            success_url: `http://localhost:3000/checkout?id=${order._id}&step=1`,
            cancel_url: "http://localhost:3000/checkout?id=${order._id}&step=2",
        });

        return res.json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
