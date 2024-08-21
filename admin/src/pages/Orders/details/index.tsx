import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import CrudModule from "@/modules/CrudModule";
import ReadOrder from "@/modules/OrderModule/ReadOrderModule";
import type { Order } from "@/types/Order";

const defaultOrder: Order = {
    _id: "",
    _user: {
        _id: "",
        firstName: "",
        lastName: "",
        role: "",
        email: "",
    },
    items: [],
    status: "placed",
    total: 0,
    paymentMethod: "",
    paymentStatus: "",
};

const OrdersDetails = () => {
    const { id } = useParams();
    useTitle("Order - Details");

    const { data, isError, isLoading } = useGetOrderByIdQuery(id || "");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return (
        <CrudModule
            actionForm={
                <ReadOrder data={data || defaultOrder} isLoading={isLoading} />
            }
        />
    );
};

export default OrdersDetails;
