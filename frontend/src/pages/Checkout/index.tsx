import useCart from "@/hooks/useCart";
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

    const { data } = useCart();

    return (
        <DefaultLayout>
            {data?.result && (
                <CheckoutModule data={data.result} steps={steps} />
            )}
        </DefaultLayout>
    );
};

export default Checkout;
