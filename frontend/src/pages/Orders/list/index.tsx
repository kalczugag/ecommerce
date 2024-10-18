import { useGetOrdersByUserIdQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";

const OrdersList = () => {
    const { userId } = useAuth();

    const { data } = useGetOrdersByUserIdQuery(userId || "", {
        skip: !userId,
    });

    return (
        <DefaultLayout>
            <div></div>
        </DefaultLayout>
    );
};

export default OrdersList;
