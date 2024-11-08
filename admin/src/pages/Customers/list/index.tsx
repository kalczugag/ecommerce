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

    const { queryConfig, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetUsersByRoleQuery({
        ...args,
        ...queryConfig,
    });

    const [deleteUser, result] = useDeleteUserMutation();

    const handleSort = (sortValues: any) => {
        const parsedSortCriteria = Object.entries(sortValues).map(
            ([label, value]) => ({ label, value: value as string })
        );
        setSortCriteria(parsedSortCriteria);
    };

    const handleSearch = useDebounce((searchTerm: string) => {
        setSortCriteria([
            { label: "firstName", value: searchTerm },
            { label: "phone", value: searchTerm },
            { label: "email", value: searchTerm },
        ]);
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
