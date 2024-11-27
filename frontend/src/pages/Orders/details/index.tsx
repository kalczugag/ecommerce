import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import ReadOrderDetailsModule from "@/modules/OrderModule/ReadOrderDetailsModule";

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");

    useTitle("Order - Details");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return <ReadOrderDetailsModule data={data} isLoading={isLoading} />;
};

export default OrderDetails;
