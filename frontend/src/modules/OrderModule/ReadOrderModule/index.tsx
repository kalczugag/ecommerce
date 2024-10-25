import Loading from "@/components/Loading";
import DefaultLayout from "@/layouts/DefaultLayout";
import OrderListItem from "../ReadOrderListModule/components/OrderListItem";
import type { Order } from "@/types/Order";

interface ReadOrderListModuleProps {
    data?: Order;
    isLoading: boolean;
}

const ReadOrderModule = ({ data, isLoading }: ReadOrderListModuleProps) => {
    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout>
                {data && <OrderListItem data={data} />}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadOrderModule;
