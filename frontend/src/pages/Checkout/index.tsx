import { Outlet, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { OrderProvider } from "@/contexts/OrderContext";
import CheckoutLayout from "@/layouts/CheckoutLayout";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";

const steps = ["delivery", "summary"];

const Checkout = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { data, isError, isLoading } = useGetOrderByIdQuery(orderId || "");

    useTitle("Checkout");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return (
        <OrderProvider
            order={data}
            steps={steps}
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
