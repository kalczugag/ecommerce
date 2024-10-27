import { useGetOrdersByUserIdQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";

const OrdersList = () => {
    const { userId } = useAuth();
    useTitle("Orders - List");

    const { data, isLoading } = useGetOrdersByUserIdQuery(userId || "", {
        skip: !userId,
    });

    return (
        <ReadOrderListModule data={data?.data || []} isLoading={isLoading} />
    );
};

export default OrdersList;
