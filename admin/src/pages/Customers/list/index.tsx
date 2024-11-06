import { useGetUsersByRoleQuery, useDeleteUserMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const CustomersList = () => {
    const [pagination] = usePagination();
    useTitle("Customers - List");

    const args = {
        roleName: "admin",
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
                <SortForm config={sortConfig} handleSubmit={handleSort} />
            }
        />
    );
};

export default CustomersList;
