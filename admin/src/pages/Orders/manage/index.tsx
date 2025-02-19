import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import ManageModule from "@/modules/ManageModule";
import { config } from "./config";

const OrdersManage = () => {
    const { id } = useParams();
    useTitle("Order - Manage");

    const { data, isError, isLoading } = useGetOrderByIdQuery(id || "");

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    return (
        <ManageModule
            config={config}
            data={data?.result}
            isLoading={isLoading}
        />
    );
};

export default OrdersManage;
