import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { initializeCheckout, setUser, useGetCurrentUserQuery } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import useCart from "@/hooks/useCart";
import CheckoutLayout from "@/layouts/CheckoutLayout";
import Loading from "@/components/Loading";
import Delivery from "./Delivery";
import Summary from "./Summary";
import { checkoutSteps } from "@/constants/checkoutSteps";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { initialized } = useAppSelector((state) => state.checkout);
    const { data, loading } = useCart();
    const { data: userData, isLoading: isUserLoading } =
        useGetCurrentUserQuery();

    const currentStep = searchParams.get("step") || checkoutSteps[0];

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
        if (!isUserLoading && userData) {
            dispatch(setUser(userData));
        }
    }, [userData]);

    // useEffect(() => {
    //     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //         e.preventDefault();
    //         e.returnValue =
    //             "You have unsaved changes. Are you sure you want to leave?";
    //         return e.returnValue;
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    return (
        <CheckoutLayout>
            <Loading isLoading={loading.get || isUserLoading}>
                {currentStep === "delivery" && <Delivery />}
                {currentStep === "summary" && <Summary />}
            </Loading>
        </CheckoutLayout>
    );
};

export default Checkout;
