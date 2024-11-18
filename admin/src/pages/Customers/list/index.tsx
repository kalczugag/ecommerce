import { useGetUsersByRoleQuery, useDeleteUserMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";

const CustomersList = () => {
    const [pagination] = usePagination();
    useTitle("Customers - List");

    const args = {
        roleName: "client",
        ...pagination,
    };

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetUsersByRoleQuery({
        ...args,
        ...sortCriteria,
    });

    const [deleteUser, result] = useDeleteUserMutation();

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((searchTerm: string) => {
        console.log(searchTerm);
    }, 250);

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteUser,
        isLoading: isFetching || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={
                <div className="space-y-4">
                    <SearchItem
                        handleSubmit={handleSearch}
                        // placeholder="Search"
                    />
                    <SortForm config={sortConfig} handleSubmit={handleSort} />
                </div>
            }
        />
    );
};

export default CustomersList;
