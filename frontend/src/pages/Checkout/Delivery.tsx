import { useGetDeliveryMethodsQuery } from "@/store";
import DeliveryModule from "@/modules/CheckoutModule/DeliveryModule";
import NotFound from "@/components/NotFound";
import { useTitle } from "@/hooks/useTitle";

const Delivery = () => {
    const { data, isError, isLoading } = useGetDeliveryMethodsQuery();

    useTitle("Checkout - Delivery");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return <DeliveryModule data={data || []} isDeliveryLoading={isLoading} />;
};

export default Delivery;
