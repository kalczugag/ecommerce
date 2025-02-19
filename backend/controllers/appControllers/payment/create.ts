import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { processShipments } from "../../../utils/processFunctions";
import type { Item, Order, Shipment } from "../../../types/Order";
import type { Product } from "../../../types/Product";
import type { User } from "../../../types/User";

import Stripe from "stripe";
import { DeliveryMethod } from "types/DeliveryMethod";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const createCheckoutSession = async (
    req: express.Request<{}, {}, Order>,
    res: express.Response
) => {
    const order = req.body;
    const url = process.env.REDIRECT_URL;

    if (!order) {
        return res
            .status(400)
            .json(errorResponse(null, "No order provided", 400));
    }

    const user = order._user as User;

    if (!user.address) {
        return res
            .status(400)
            .json(errorResponse(null, "No address provided", 400));
    }

    let lineItems = (order.items as Item[]).map((item) => {
        const productData = item._product as Product;
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

    const { shipments, isMoreThanOne, shipmentTotal } = processShipments(
        order.shipments as Shipment[]
    );

    const createShippingOptions = (): any[] => {
        if (!isMoreThanOne) {
            const deliveryMethod = shipments[0]
                ._deliveryMethod as DeliveryMethod;

            return [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: shipmentTotal * 100,
                            currency: "usd",
                        },
                        display_name: deliveryMethod.providers[0].name,
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: deliveryMethod.providers[0]
                                    .estimatedDeliveryTimeMin,
                            },
                            maximum: {
                                unit: "business_day",
                                value: deliveryMethod.providers[0]
                                    .estimatedDeliveryTimeMax,
                            },
                        },
                    },
                },
            ];
        }

        return shipments.map((shipment) => {
            const deliveryMethod = shipment._deliveryMethod as DeliveryMethod;

            return {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: shipment.shippingCost * 100,
                        currency: "usd",
                    },
                    display_name: deliveryMethod.providers[0].name,
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: deliveryMethod.providers[0]
                                .estimatedDeliveryTimeMin,
                        },
                        maximum: {
                            unit: "business_day",
                            value: deliveryMethod.providers[0]
                                .estimatedDeliveryTimeMax,
                        },
                    },
                },
            };
        });
    };

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "paypal"],
            mode: "payment",
            line_items: lineItems,
            customer_email: user.email,
            automatic_tax: { enabled: true },
            metadata: {
                userId: user._id!,
                orderId: order._id!,
            },
            payment_intent_data: {
                metadata: {
                    userId: user._id!,
                    orderId: order._id!,
                },
            },
            shipping_options: createShippingOptions(),
            success_url: `${url}/account/orders/${order._id}?status=confirmed`,
            cancel_url: `${url}/account/orders/${order._id}?status=canceled`,
        });

        return res.json(successResponse(session.id));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
