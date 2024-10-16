import { useCreatePaymentMutation } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@mui/material";
import type { Order } from "@/types/Order";

const stripePromise = loadStripe(
    "pk_test_51QAVfFCeAQbmOrQrs7FGHSpQGIkEEVEVHULiWMWYAIoBy1cGNYlmVSvQxy648SjYHG5JcDD01J3YIz5tuJCoeyoV003GfOyfFz"
);

const CheckoutButton = ({ order }: { order?: Order }) => {
    const [createPayment, { isLoading, isError }] = useCreatePaymentMutation();

    if (!order) {
        return null;
    }

    const handleCheckout = async () => {
        try {
            const { data } = await createPayment(order);

            if (data?.sessionId) {
                const stripe = await stripePromise;
                await stripe?.redirectToCheckout({ sessionId: data.sessionId });
            }
        } catch (err) {
            console.error("Checkout error:", err);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={handleCheckout}
            disabled={isLoading || isError}
        >
            Pay
        </Button>
    );
};

const Payment = () => {
    const { order } = useOrder();

    return (
        <div>
            <CheckoutButton order={order} />
        </div>
    );
};

export default Payment;
