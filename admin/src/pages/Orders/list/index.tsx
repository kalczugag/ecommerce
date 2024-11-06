import { useGetAllOrdersQuery } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const OrdersList = () => {
    const [pagination] = usePagination();
    useTitle("Orders - List");

    const { queryConfig, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllOrdersQuery({
        ...pagination,
        ...queryConfig,
    });

    const handleSort = (sortValues: any) => {
        const parsedSortCriteria = Object.entries(sortValues).map(
            ([label, value]) => ({ label, value: value as string })
        );
        setSortCriteria(parsedSortCriteria);
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
            actionForm={
                <SortForm config={sortConfig} handleSubmit={handleSort} />
            }
        />
    );
};

export default OrdersList;
