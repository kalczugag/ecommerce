import { useGetDeliveryMethodsQuery } from "@/store";
import DeliveryModule from "@/modules/CheckoutModule/DeliveryModule";
import NotFound from "@/components/NotFound";
import { useTitle } from "@/hooks/useTitle";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Delivery = () => {
    const [_, setSearchParams] = useSearchParams();
    const { data, isError, isLoading } = useGetDeliveryMethodsQuery();

    useTitle("Checkout - Delivery");

    useEffect(() => {
        setSearchParams({ step: "delivery" });
    }, []);

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <DeliveryModule
            data={data?.result || []}
            isDeliveryLoading={isLoading}
        />
    );
};

export default Delivery;
