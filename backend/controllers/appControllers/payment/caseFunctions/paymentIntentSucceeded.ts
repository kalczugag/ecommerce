import { OrderModel } from "../../../../models/Order";
import { CartModel } from "../../../../models/Cart";
import { PaymentModel } from "../../../../models/Order/Payment";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const handlePaymentIntentSucceeded = async (
    paymentIntent: Stripe.PaymentIntent
) => {
    const fullPaymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntent.id,
        { expand: ["payment_method"] }
    );

    const { userId, orderId } = fullPaymentIntent.metadata;

    if (!userId || !orderId) {
        throw new Error("Missing userId or orderId");
    }

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
              checks: paymentMethod.card.checks
                  ? {
                        cvc_check: paymentMethod.card.checks.cvc_check,
                        address_line1_check:
                            paymentMethod.card.checks.address_line1_check,
                        address_postal_code_check:
                            paymentMethod.card.checks.address_postal_code_check,
                    }
                  : null,
          }
        : null;

    try {
        const payment = await PaymentModel.create({
            _order: orderId,
            _user: userId,
            paymentMethod: paymentMethod.type,
            paymentStatus:
                fullPaymentIntent.status === "succeeded"
                    ? "completed"
                    : "failed",
            amount: parseFloat((fullPaymentIntent.amount / 100).toFixed(2)),
            transactionId: fullPaymentIntent.id,
            paymentDate: new Date(),
            authorizationStatus: "closed",
            allowAdditionalCapture:
                fullPaymentIntent.status === "succeeded" ? true : false,
            authorized: true,
            capturedAmount: parseFloat(
                (fullPaymentIntent.amount / 100).toFixed(2)
            ),
            card: cardDetails,
        });

        if (!payment) throw new Error("Error creating payment");

        await OrderModel.findByIdAndUpdate(orderId, {
            status: "placed",
            payments: [payment._id],
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
