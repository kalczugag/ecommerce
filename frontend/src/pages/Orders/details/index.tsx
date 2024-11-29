import { useParams, useSearchParams } from "react-router-dom";
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import ReadOrderDetailsModule from "@/modules/OrderModule/ReadOrderDetailsModule";
import { useEffect } from "react";

const OrderDetails = () => {
    useTitle("Order - Details");

    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status") as "success" | "canceled";

    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");
    const [updateOrder] = useUpdateOrderMutation();

    useEffect(() => {
        if (status === "canceled") {
            updateOrder({
                _id: id,
                status: "canceled",
                paymentStatus: "canceled",
            });
        } else if (status === "success") {
            updateOrder({
                _id: id,
                isPending: true,
            });
        }
    }, [status]);

    if (isError || (!isLoading && !data)) return <NotFound />;

    return <ReadOrderDetailsModule data={data} isLoading={isLoading} />;
};

export default OrderDetails;
