import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/useCheckout";
import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";
import CheckoutModule from "@/modules/CheckoutModule";

const steps = [
    "Shipping address",
    "Delivery method",
    "Payment details",
    "Review your order",
];

const Checkout = () => {
    useTitle("Checkout");

    const stripePromise = useMemo(
        () => loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY),
        []
    );

    const { data } = useCart();
    const { userData, handleUpdateCheckout } = useCheckout(data?.result);

    return (
        <DefaultLayout>
            {data?.result && (
                <CheckoutModule
                    data={data.result}
                    userData={userData}
                    steps={steps}
                    handleUpdateCheckout={handleUpdateCheckout}
                    stripePromise={stripePromise}
                />
            )}
        </DefaultLayout>
    );
};

export default Checkout;
