import Stripe from "stripe";
import { sendEmail } from "../../../config/nodemailer";
import { CartModel } from "../../../models/Cart";
import { OrderModel } from "../../../models/Order";
import { orderConfirmation } from "../../../emailTemplates/orderConfirmation";

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
            .populate("items._product")
            .exec();

        if (!order) {
            throw new Error("Order not found");
        }

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
