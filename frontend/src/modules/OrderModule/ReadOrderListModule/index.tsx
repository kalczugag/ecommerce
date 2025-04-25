import AccountLayout from "@/layouts/AccountLayout";
import OrdersList from "./components/OrdersList";

interface ReadOrderListModuleProps {
    userId: string;
    status: string;
}

const ReadOrderListModule = ({ userId, status }: ReadOrderListModuleProps) => {
    return (
        <AccountLayout label="Orders">
            <OrdersList userId={userId} status={status} sort="-createdAt" />
        </AccountLayout>
    );
};

export default ReadOrderListModule;
