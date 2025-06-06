import Stripe from "stripe";
import { OrderModel } from "../../../../models/Order";
import { CartModel } from "../../../../models/Cart";
import { PaymentModel } from "../../../../models/Order/Payment";
import { EventModel } from "../../../../models/Analytics/Event";
import { ProductModel } from "../../../../models/Product";
import { sendEmail } from "../../../../config/nodemailer";
import { orderConfirmation } from "../../../../emailTemplates/orderConfirmation";

import type { Item } from "../../../../types/Order";
import type { Product } from "../../../../types/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const handlePaymentIntentSucceeded = async (
    paymentIntent: Stripe.PaymentIntent
) => {
    const fullPaymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntent.id,
        {
            expand: [
                "payment_method",
                "charges.data.billing_details",
                "charges",
            ],
        }
    );

    const charges = (fullPaymentIntent as any).charges;

    const {
        userId,
        orderId,
        referrer = "unknown",
    } = fullPaymentIntent.metadata || {};
    const email =
        fullPaymentIntent.receipt_email ||
        charges?.data?.[0]?.billing_details?.email;

    if (!userId || !orderId) {
        throw new Error("Missing userId or orderId in metadata");
    }

    try {
        const paymentMethod =
            fullPaymentIntent.payment_method as Stripe.PaymentMethod;
        const cardDetails = paymentMethod.card
            ? {
                  brand: paymentMethod.card.brand,
                  last4: paymentMethod.card.last4,
                  exp_month: paymentMethod.card.exp_month,
                  exp_year: paymentMethod.card.exp_year,
                  funding: paymentMethod.card.funding,
                  country: paymentMethod.card.country,
                  checks: paymentMethod.card.checks || null,
              }
            : null;

        const payment = await PaymentModel.create({
            _order: orderId,
            _user: userId,
            paymentMethod: paymentMethod.type,
            paymentStatus: "completed",
            amount: fullPaymentIntent.amount / 100,
            transactionId: fullPaymentIntent.id,
            paymentDate: new Date(),
            authorizationStatus: "closed",
            allowAdditionalCapture: true,
            authorized: true,
            capturedAmount: fullPaymentIntent.amount / 100,
            card: cardDetails,
        });

        const order = await OrderModel.findByIdAndUpdate(
            orderId,
            { status: "confirmed", payments: [payment._id] },
            { new: true }
        )
            .populate([
                {
                    path: "_user",
                    select: "firstName lastName phone address email",
                },
                { path: "shipments" },
                {
                    path: "items",
                    populate: {
                        path: "_product",
                        model: "Product",
                    },
                },
            ])
            .exec();

        if (!order) {
            throw new Error("Order not found");
        }

        const newEvent = new EventModel({
            eventType: "order",
            _user: userId,
            _session: paymentIntent.id,
            metadata: {
                paymentStatus: fullPaymentIntent.status,
                amountTotal: fullPaymentIntent.amount / 100,
                currency: fullPaymentIntent.currency,
                referrer,
                products: (order.items as Item[]).map((item) => ({
                    _product: (item._product as Product)._id,
                    quantity: item.quantity,
                })),
            },
            timestamp: new Date(),
        });

        await newEvent.save();

        const bulkUpdates = (order.items as Item[]).map((item) => {
            const productId = (item._product as Product)._id;
            const purchasedQuantity = item.quantity;
            const purchasedSize = item.size;

            return {
                updateOne: {
                    filter: { _id: productId, "size.name": purchasedSize },
                    update: {
                        $inc: {
                            quantity: -purchasedQuantity,
                            "size.$.quantity": -purchasedQuantity,
                        },
                    },
                },
            };
        });

        await ProductModel.bulkWrite(bulkUpdates);

        await CartModel.findOneAndUpdate(
            { _user: userId },
            {
                $set: {
                    items: [],
                    subTotal: 0,
                    discount: 0,
                    deliveryCost: 0,
                    total: 0,
                },
            }
        );

        if (email) {
            await sendEmail({
                to: email,
                subject: "Order Confirmation",
                html: orderConfirmation(order),
            });
        }
    } catch (error) {
        console.error("Error in handlePaymentIntentSucceeded:", error);
    }
};
