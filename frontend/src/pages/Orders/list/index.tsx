import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import { usePaginatedOrders } from "@/hooks/usePaginatedOrders";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";
import { useSearchParams } from "react-router-dom";

const OrdersList = () => {
    useTitle("Orders - List");

    const { userId } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const { allOrders, isLoading, hasMoreOrders } = usePaginatedOrders(
        userId,
        2,
        {
            sort: "-createdAt",
            status: searchParams.get("status") as string,
        }
    );

    const handleFilter = (value: { status: string }) => {
        setSearchParams(value);
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
