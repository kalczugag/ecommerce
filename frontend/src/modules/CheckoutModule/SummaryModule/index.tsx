import { loadStripe } from "@stripe/stripe-js";
import { useAddOrderMutation, useCreatePaymentMutation } from "@/store";
import { useAppSelector } from "@/hooks/useStore";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import CheckoutSummary from "@/modules/CartModule/components/CheckoutSummary";
import Contact from "./components/Contact";
import Box from "@/components/Box";
import type { Cart } from "@/types/Cart";
import type { CreateOrder } from "@/types/Order";
import { enqueueSnackbar } from "notistack";

const SummaryModule = () => {
    const {
        products,
        userData,
        subTotal,
        discount,
        shippingAddress,
        billingAddress,
        _deliveryMethod,
        deliveryCost,
        total,
    } = useAppSelector((state) => state.checkout);

    const stripePromise = loadStripe(
        "pk_test_51QAVfFCeAQbmOrQrs7FGHSpQGIkEEVEVHULiWMWYAIoBy1cGNYlmVSvQxy648SjYHG5JcDD01J3YIz5tuJCoeyoV003GfOyfFz"
    );

    const [createOrder, { isLoading: orderLoading }] = useAddOrderMutation();
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
        const orderData: CreateOrder = {
            orderData: {
                _user: userData?._id || "",
                _cart: (userData?._cart as string) || "",
                shippingAddress: shippingAddress!,
                billingAddress: billingAddress!,
            },
            shipmentData: {
                shipFrom: {
                    street: "Człuchowska 92",
                    city: "Warsaw",
                    state: "Masovian",
                    postalCode: "01-360",
                    country: "Poland",
                },
                shipTo: shippingAddress!,
                _deliveryMethod: _deliveryMethod!,
            },
        };

        try {
            const { data: order } = await createOrder(orderData);

            if (!order?.result._id) {
                return enqueueSnackbar("Failed to create order", {
                    variant: "error",
                });
            }

            const { data } = await createPayment({
                orderId: order?.result._id,
            });

            if (data?.result) {
                const stripe = await stripePromise;
                await stripe?.redirectToCheckout({
                    sessionId: data.result,
                });
            }
        } catch (err) {
            console.error("Checkout error:", err);
        }
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
                    isLoading={orderLoading || paymentLoading}
                    handleCheckout={handleCheckout}
                    isSummary
                />
            </div>
        </div>
    );
};

export default SummaryModule;
