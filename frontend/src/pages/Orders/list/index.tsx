import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import { usePaginatedOrders } from "@/hooks/usePaginatedOrders";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";

const OrdersList = () => {
    const { userId } = useAuth();
    useTitle("Orders - List");

    const [filter, setFilter] = useState("");

    const { allOrders, isLoading, hasMoreOrders } = usePaginatedOrders(
        userId,
        2,
        {
            sort: "-createdAt",
            status: filter,
        }
    );

    const handleFilter = (value: { status: string }) => {
        setFilter(value.status);
    };

    return (
        <>
            <ReadOrderListModule
                data={allOrders}
                isLoading={isLoading}
                handleFilter={handleFilter}
            />
            {hasMoreOrders && (
                <div id="loadMoreTrigger" style={{ height: "20px" }} />
            )}
        </>
    );
};

export default OrdersList;
