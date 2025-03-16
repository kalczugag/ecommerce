import Stripe from "stripe";
import { sendEmail } from "../../../../config/nodemailer";
import { CartModel } from "../../../../models/Cart";
import { ProductModel } from "../../../../models/Product";
import { OrderModel } from "../../../../models/Order";
import { EventModel } from "../../../../models/Analytics/Event";
import { orderConfirmation } from "../../../../emailTemplates/orderConfirmation";
import type { Item } from "../../../../types/Order";
import type { Product } from "../../../../types/Product";

export const handleCheckoutSessionCompleted = async (
    checkoutSession: Stripe.Checkout.Session
) => {
    const { userId, orderId } = checkoutSession.metadata || {};
    const email = checkoutSession.customer_email;

    if (!userId || !orderId) {
        throw new Error("Missing userId or orderId");
    }

    try {
        const order = await OrderModel.findByIdAndUpdate(
            orderId,
            {
                status: "completed",
            },
            { new: true }
        )
            .populate("_user", "firstName lastName phone address")
            .populate("shipments")
            .populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            })
            .exec();

        if (!order) {
            throw new Error("Order not found");
        }

        const newEvent = new EventModel({
            eventType: "order",
            _user: userId,
            _session: checkoutSession.id,
            metadata: {
                paymentStatus: checkoutSession.payment_status,
                amountTotal: parseFloat(
                    ((checkoutSession.amount_total || 0) / 100).toFixed(2)
                ),
                currency: checkoutSession.currency,
                referrer: checkoutSession.metadata?.referrer || "unknown",
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
                $set: { items: [] },
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
        console.error("Error updating order:", error);
    }
};
