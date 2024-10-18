import { useGetOrdersByUserIdQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";

const OrdersList = () => {
    const { userId } = useAuth();

    const { data, isLoading } = useGetOrdersByUserIdQuery(userId || "", {
        skip: !userId,
    });

    return (
        <ReadOrderListModule data={data?.data || []} isLoading={isLoading} />
    );
};

export default OrdersList;
