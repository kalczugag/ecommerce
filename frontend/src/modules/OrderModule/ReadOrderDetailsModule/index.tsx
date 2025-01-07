import AccountLayout from "@/layouts/AccountLayout";
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
        <AccountLayout>
            <OrderDetails data={data} isLoading={isLoading} />
        </AccountLayout>
    );
};

export default ReadOrderDetailsModule;
