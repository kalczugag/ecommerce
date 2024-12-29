import DefaultLayout from "@/layouts/DefaultLayout";
import OrderDetails from "./components/OrderDetails";
import type { Order } from "@/types/Order";

interface ReadOrderListModuleProps {
    data?: Order;
    isLoading: boolean;
}

const ReadOrderDetailsModule = ({
    data,
    isLoading,
}: ReadOrderListModuleProps) => {
    return (
        <DefaultLayout marginY={false}>
            <OrderDetails data={data} isLoading={isLoading} />
        </DefaultLayout>
    );
};

export default ReadOrderDetailsModule;
