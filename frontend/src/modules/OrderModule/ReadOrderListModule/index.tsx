import { useState } from "react";
import AccountLayout from "@/layouts/AccountLayout";
import Loading from "@/components/Loading";
import OrdersList from "./components/OrdersList";

interface ReadOrderListModuleProps {
    userId: string;
    status: string;
}

const ReadOrderListModule = ({ userId, status }: ReadOrderListModuleProps) => {
    const [isFetching, setIsFetching] = useState(false);

    return (
        <Loading isLoading={isFetching}>
            <AccountLayout label="Orders">
                <OrdersList
                    userId={userId}
                    status={status}
                    sort="-createdAt"
                    setIsFetching={setIsFetching}
                />
            </AccountLayout>
        </Loading>
    );
};

export default ReadOrderListModule;
