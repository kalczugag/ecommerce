import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";
import { useSearchParams } from "react-router-dom";

const OrdersList = () => {
    useTitle("Orders - List");

    const { userId } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get("status") || "";

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
            <ReadOrderListModule userId={userId || ""} status={status} />
        </>
    );
};

export default OrdersList;
