import { useEffect } from "react";
import {
    useGetCurrentUserQuery,
    resetCheckout,
    initializeCheckout,
    updateCheckout,
    setUser,
    type CheckoutActionPayload,
} from "@/store";
import { useAppDispatch, useAppSelector } from "./useStore";
import { Cart } from "@/types/Cart";

const useCheckout = (cartData?: Cart) => {
    const dispatch = useAppDispatch();
    const { initialized, userData } = useAppSelector((state) => state.checkout);
    const { data: currentUser, isLoading: isUserLoading } =
        useGetCurrentUserQuery();

    useEffect(() => {
        dispatch(resetCheckout());
    }, []);

    useEffect(() => {
        if (!cartData || initialized) return;

        const { items, subTotal, discount, deliveryCost, total } = cartData;

        dispatch(
            initializeCheckout({
                products: items,
                subTotal,
                discount,
                deliveryCost,
                total,
            })
        );
    }, [cartData, initialized]);

    useEffect(() => {
        if (!isUserLoading && currentUser) {
            dispatch(setUser(currentUser));
        }
    }, [currentUser]);

    const handleUpdateCheckout = (data: Partial<CheckoutActionPayload>) =>
        dispatch(updateCheckout(data));

    return { userData, handleUpdateCheckout };
};

export default useCheckout;
