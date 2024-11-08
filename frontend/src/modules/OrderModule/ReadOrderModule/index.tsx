import DefaultLayout from "@/layouts/DefaultLayout";
import OrderListItem from "../ReadOrderListModule/components/OrderListItem";
import type { Order } from "@/types/Order";

interface ReadOrderListModuleProps {
    data?: Order;
    isLoading: boolean;
}

const ReadOrderModule = ({ data, isLoading }: ReadOrderListModuleProps) => {
    return (
        <DefaultLayout>
            <OrderListItem data={data} isLoading={isLoading} isDetails />
        </DefaultLayout>
    );
};

export default ReadOrderModule;
