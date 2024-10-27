import { useGetAllOrdersQuery } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const OrdersList = () => {
    const [pagination] = usePagination();
    useTitle("Orders - List");

    const { data, isFetching } = useGetAllOrdersQuery(pagination);

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        isLoading: isFetching,
    };

    return (
        <CrudModule
            config={config}
            actionForm={<SortForm config={sortConfig} handleSubmit={sortFn} />}
        />
    );
};

export default OrdersList;
