import { useCallback, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
    const location = useLocation();

    const isRedirectingToStripe = useRef(false);
    const prevLocation = useRef(location.pathname);

    useTitle("Checkout");

    const handleUnloadOrder = useCallback(() => {
        if (orderId && !isRedirectingToStripe.current)
            handleMutation({
                mutation: deleteOrder,
                values: orderId,
                snackbar: false,
            });
    }, [deleteOrder, handleMutation, orderId]);

    useEffect(() => {
        window.addEventListener("beforeunload", handleUnloadOrder);

        return () => {
            window.removeEventListener("beforeunload", handleUnloadOrder);
        };
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        const wasOnCheckout = prevLocation.current.includes("/checkout");
        const isStillOnCheckout = currentPath.includes("/checkout");

        if (
            wasOnCheckout &&
            !isStillOnCheckout &&
            !isRedirectingToStripe.current
        ) {
            handleUnloadOrder();
        }

        prevLocation.current = currentPath;
    }, [handleUnloadOrder, location.pathname]);

    const prepareStripeRedirect = useCallback(() => {
        isRedirectingToStripe.current = true;
    }, []);

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <OrderProvider
            order={data?.result}
            steps={checkoutSteps}
            isError={isError}
            isLoading={isLoading}
            onStripeRedirect={prepareStripeRedirect}
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
