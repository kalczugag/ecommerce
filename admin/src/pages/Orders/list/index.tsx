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

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllOrdersQuery({
        ...pagination,
        ...sortCriteria,
        populate: "items,payments.paymentStatus,_user.firstName,_user.lastName",
    });

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((searchTerm: { search: string }) => {
        const filter = {
            $or: [{ _id: searchTerm.search }, { _user: searchTerm.search }],
        };

        setSortCriteria({ filter });
    }, 250);

    const config = {
        tableConfig,
        tableData: data?.result || [],
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
