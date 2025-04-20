import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { initializeCheckout } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import useCart from "@/hooks/useCart";
import CheckoutLayout from "@/layouts/CheckoutLayout";
import Loading from "@/components/Loading";
import Delivery from "./Delivery";
import Summary from "./Summary";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { initialized } = useAppSelector((state) => state.checkout);
    const { data, loading } = useCart();

    useTitle("Checkout");

    const currentStep = searchParams.get("step") || "delivery";

    useEffect(() => {
        if (data?.result && !initialized) {
            const { items, subTotal, discount, deliveryCost, total } =
                data.result;

            dispatch(
                initializeCheckout({
                    products: items,
                    subTotal,
                    discount,
                    deliveryCost,
                    total,
                })
            );
        }
    }, [data?.result]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue =
                "You have unsaved changes. Are you sure you want to leave?";
            return e.returnValue;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <CheckoutLayout>
            <Loading isLoading={loading.get}>
                {currentStep === "delivery" && <Delivery />}
                {currentStep === "summary" && <Summary />}
            </Loading>
        </CheckoutLayout>
    );
};

export default Checkout;
