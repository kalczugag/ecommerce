import Stripe from "stripe";
import { OrderModel } from "../../../models/Order";
import { CartModel } from "../../../models/Cart";
import { PaymentModel } from "../../../models/Order/Payment";

export const handlePaymentFailed = async (
    paymentIntent: Stripe.PaymentIntent
) => {
    const { userId, orderId } = paymentIntent.metadata;

    if (!userId || !orderId) {
        throw new Error("Missing userId or orderId");
    }

    try {
        const payment = await PaymentModel.create({
            _order: orderId,
            _user: userId,
            paymentMethod: "credit_card",
            paymentStatus: "failed",
            amount: paymentIntent.amount / 100,
            transactionId: paymentIntent.id,
            paymentDate: new Date(),
        });

        if (!payment) throw new Error("Error creating payment");

        await OrderModel.findByIdAndUpdate(orderId, {
            status: "placed",
            _payment: payment._id,
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
