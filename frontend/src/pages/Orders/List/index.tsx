import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import { usePaginatedOrders } from "@/hooks/usePaginatedOrders";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";
import { useSearchParams } from "react-router-dom";

const OrdersList = () => {
    useTitle("Orders - List");

    const { userId } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get("status") || "";

    const { allOrders, isLoading, hasMoreOrders } = usePaginatedOrders(
        userId,
        2,
        status,
        "-createdAt"
    );

    const handleFilter = (value: { status: string }) => {
        setSearchParams(value);

        if (!value.status) clearParam("status");
    };

    const clearParam = (param: string) => {
        searchParams.delete(param);
        setSearchParams(searchParams);
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
