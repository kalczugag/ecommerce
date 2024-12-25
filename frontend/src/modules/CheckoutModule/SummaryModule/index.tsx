import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentMutation } from "@/store";
import { useOrder } from "@/contexts/OrderContext";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import CheckoutSummary from "@/modules/CartModule/components/CheckoutSummary";
import Contact from "./components/Contact";
import Box from "@/components/Box";
import type { Cart } from "@/types/Cart";

const stripePromise = loadStripe(
    "pk_test_51QAVfFCeAQbmOrQrs7FGHSpQGIkEEVEVHULiWMWYAIoBy1cGNYlmVSvQxy648SjYHG5JcDD01J3YIz5tuJCoeyoV003GfOyfFz"
);

const SummaryModule = () => {
    const { order, isLoading } = useOrder();
    const [createPayment, { isLoading: paymentLoading }] =
        useCreatePaymentMutation();

    const cartProps: Cart = {
        _user: order?._user?._id || "",
        items: order?.items || [],
        subTotal: order?.subTotal || 0,
        discount: order?.discount || 0,
        deliveryCost: order?.deliveryCost || 0,
        total: order?.total || 0,
    };

    const handleCheckout = async () => {
        try {
            const { data } = await createPayment(order!);

            if (data?.sessionId) {
                const stripe = await stripePromise;
                await stripe?.redirectToCheckout({ sessionId: data.sessionId });
            }
        } catch (err) {
            console.error("Checkout error:", err);
        }
    };

    return (
        <div className="space-y-4 py-6">
            <Box>
                <Contact
                    data={order?._user}
                    addressData={{
                        shippingAddress: order?.shippingAddress,
                        billingAddress: order?.billingAddress,
                    }}
                />
            </Box>
            <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
                <div className="w-full space-y-4 max-h-[500px] overflow-auto">
                    {order?.items.map((item, index) => (
                        <CartProductItem
                            key={index}
                            data={item}
                            isLoadingDelete={false}
                            isLoadingQuantity={false}
                            editable={false}
                        />
                    ))}
                </div>
                <CheckoutSummary
                    data={cartProps}
                    isLoading={isLoading || paymentLoading}
                    handleCheckout={handleCheckout}
                    isSummary
                />
            </div>
        </div>
    );
};

export default SummaryModule;
