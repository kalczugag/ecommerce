import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import type { Order } from "@/types/Order";
import NotFound from "@/components/NotFound";
import ReadOrderDetailsModule from "@/modules/OrderModule/ReadOrderDetailsModule";

const OrderDetails = () => {
    useTitle("Order - Details");

    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status") as Order["status"];

    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");
    const [updateOrder] = useUpdateOrderMutation();

    useEffect(() => {
        if (status) {
            updateOrder({
                _id: id || "",
                status,
            });
        }
    }, [status]);

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return <ReadOrderDetailsModule data={data?.result} isLoading={isLoading} />;
};

export default OrderDetails;
