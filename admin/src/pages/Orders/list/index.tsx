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

    const { data, isFetching } = useGetAllOrdersQuery(pagination);

    const { sortedData, setSortCriteria } = useSortedData(
        data?.data || [],
        sortConfig
    );

    const handleSort = (sortValues: any) => {
        const parsedSortCriteria = Object.entries(sortValues).map(
            ([label, value]) => ({ label, value: value as string })
        );
        setSortCriteria(parsedSortCriteria);
    };

    const config = {
        tableConfig,
        tableData: sortedData,
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
