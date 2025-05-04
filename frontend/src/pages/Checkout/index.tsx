import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    initializeCheckout,
    resetCheckout,
    setUser,
    useGetCurrentUserQuery,
} from "@/store";
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
        dispatch(resetCheckout());
    }, []);

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
    }, [data?.result, initialized]);

    useEffect(() => {
        if (!isUserLoading && userData) {
            dispatch(setUser(userData));
        }
    }, [userData]);

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
