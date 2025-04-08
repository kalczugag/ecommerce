import { useCallback, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetOrderByIdQuery, useDeleteOrderMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { checkoutSteps } from "@/constants/checkoutSteps";
import { OrderProvider } from "@/contexts/OrderContext";
import CheckoutLayout from "@/layouts/CheckoutLayout";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";

const Checkout = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { data, isError, isLoading } = useGetOrderByIdQuery(orderId || "");
    const [deleteOrder] = useDeleteOrderMutation();
    const { handleMutation } = useHandleMutation();

    useTitle("Checkout");

    const handleUnloadOrder = useCallback(() => {
        if (orderId)
            handleMutation({
                mutation: deleteOrder,
                values: orderId,
                snackbar: false,
            });
    }, [orderId]);

    useEffect(() => {
        window.addEventListener("beforeunload", handleUnloadOrder);

        return () => {
            window.removeEventListener("beforeunload", handleUnloadOrder);
        };
    }, [handleUnloadOrder]);

    useEffect(() => {
        return () => {
            handleUnloadOrder();
        };
    }, [handleUnloadOrder]);

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <OrderProvider
            order={data?.result}
            steps={checkoutSteps}
            isError={isError}
            isLoading={isLoading}
        >
            <CheckoutLayout>
                <Loading isLoading={isLoading}>
                    <Outlet />
                </Loading>
            </CheckoutLayout>
        </OrderProvider>
    );
};

export default Checkout;
