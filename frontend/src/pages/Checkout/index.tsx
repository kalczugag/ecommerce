import { useSearchParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import { OrderProvider } from "@/contexts/OrderContext";
import CheckoutModule from "@/modules/CheckoutModule";
import NotFound from "@/components/NotFound";

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const { data, isError, isLoading } = useGetOrderByIdQuery(id || "");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return (
        <OrderProvider order={data} isError={isError} isLoading={isLoading}>
            <CheckoutModule />;
        </OrderProvider>
    );
};

export default Checkout;
