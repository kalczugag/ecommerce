import { useGetAllOrdersQuery } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";

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

    const handleSearch = useDebounce((searchTerm: string) => {
        setSortCriteria([
            { label: "_id", value: searchTerm },
            { label: "_user", value: searchTerm },
        ]);
    }, 250);

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
                <div className="space-y-4">
                    <SearchItem
                        handleSubmit={handleSearch}
                        placeholder="Search by order or user id"
                    />
                    <SortForm config={sortConfig} handleSubmit={handleSort} />
                </div>
            }
        />
    );
};

export default OrdersList;
