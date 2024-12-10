import Stripe from "stripe";
import { OrderModel } from "../../../models/Order";
import { CartModel } from "../../../models/Cart";
import { PaymentModel } from "../../../models/Order/Payment";

export const handlePaymentIntentSucceeded = async (
    paymentIntent: Stripe.PaymentIntent
) => {
    const { userId, orderId } = paymentIntent.metadata;

    try {
        const payment = await PaymentModel.create({
            _order: "66f56ec90315c8d8bca30632",
            _user: "66f56ec90315c8d8bca3062f",
            paymentMethod: "credit_card",
            paymentStatus: "completed",
            amount: paymentIntent.amount / 100,
            transactionId: paymentIntent.id,
            paymentDate: new Date(),
        });

        if (!payment) throw new Error("Error creating payment");

        await OrderModel.findByIdAndUpdate(orderId, {
            status: "completed",
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
