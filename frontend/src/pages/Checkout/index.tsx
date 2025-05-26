import CheckoutModule from "@/modules/CheckoutModule";
import DefaultLayout from "@/layouts/DefaultLayout";
import useCart from "@/hooks/useCart";
import Loading from "@/components/Loading";

const steps = [
    "Shipping address",
    "Delivery method",
    "Payment details",
    "Review your order",
];

const Checkout = () => {
    const { data, loading } = useCart();

    return (
        <DefaultLayout>
            <Loading isLoading={loading.get}>
                {data?.result && (
                    <CheckoutModule data={data.result} steps={steps} />
                )}
            </Loading>
        </DefaultLayout>
    );
};

export default Checkout;
