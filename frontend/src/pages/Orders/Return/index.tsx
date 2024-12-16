import OrderReturnModule from "@/modules/OrderModule/OrderReturnModule";
import NotFound from "@/components/NotFound";
import { useGetOrderByIdQuery } from "@/store";
import { useParams } from "react-router-dom";

const OrderReturn = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return <OrderReturnModule />;
};

export default OrderReturn;
