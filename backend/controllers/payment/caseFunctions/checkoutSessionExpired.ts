import Stripe from "stripe";
import { OrderModel } from "../../../models/Order";
import { CartModel } from "../../../models/Cart";

export const handleCheckoutSessionExpired = async (
    checkoutSession: Stripe.Checkout.Session
) => {
    const { userId, orderId } = checkoutSession.metadata || {};

    if (!userId || !orderId) {
        throw new Error("Missing userId or orderId");
    }

    try {
        await OrderModel.findByIdAndUpdate(orderId, {
            status: "canceled",
        });

        await CartModel.findOneAndUpdate(
            { _user: userId },
            {
                $set: { items: [] },
            }
        );
    } catch (error) {
        console.error("Error updating order:", error);
    }
};
