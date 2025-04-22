import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentMutation } from "@/store";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import CheckoutSummary from "@/modules/CartModule/components/CheckoutSummary";
import Contact from "./components/Contact";
import Box from "@/components/Box";
import type { Cart } from "@/types/Cart";
import { useAppSelector } from "@/hooks/useStore";

const stripePromise = loadStripe(
    "pk_test_51QAVfFCeAQbmOrQrs7FGHSpQGIkEEVEVHULiWMWYAIoBy1cGNYlmVSvQxy648SjYHG5JcDD01J3YIz5tuJCoeyoV003GfOyfFz"
);

const SummaryModule = () => {
    const { products, userData, subTotal, discount, deliveryCost, total } =
        useAppSelector((state) => state.checkout);

    const [createPayment, { isLoading: paymentLoading }] =
        useCreatePaymentMutation();

    const cartProps: Cart = {
        _user: userData?._id || "",
        items: products,
        subTotal,
        discount: discount || 0,
        deliveryCost: deliveryCost || 0,
        total,
    };

    const handleCheckout = async () => {
        // try {
        //     const { data } = await createPayment(order!);
        //     if (data?.result) {
        //         const stripe = await stripePromise;
        //         await stripe?.redirectToCheckout({
        //             sessionId: data.result,
        //         });
        //     }
        // } catch (err) {
        //     console.error("Checkout error:", err);
        // }
    };

    return (
        <div className="space-y-4 py-6">
            <Box>
                <Contact
                    data={userData}
                    addressData={{
                        shippingAddress: userData?.address, // temporary
                        billingAddress: userData?.address,
                    }}
                />
            </Box>
            <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
                <div className="w-full space-y-4 max-h-[500px] overflow-auto">
                    {products.map((item, index) => (
                        <CartProductItem
                            key={index}
                            data={item}
                            isLoading={false}
                            editable={false}
                        />
                    ))}
                </div>
                <CheckoutSummary
                    data={cartProps}
                    isLoading={paymentLoading}
                    handleCheckout={handleCheckout}
                    isSummary
                />
            </div>
        </div>
    );
};

export default SummaryModule;
