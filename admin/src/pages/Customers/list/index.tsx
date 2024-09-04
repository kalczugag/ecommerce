import { useGetUsersByRoleQuery, useDeleteUserMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import { usePagination } from "@/hooks/usePagination";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const CustomersList = () => {
    const { page, pageSize } = usePagination();
    useTitle("Customers");

    const args = {
        roleName: "admin",
        page,
        pageSize,
    };

    const { data, isLoading } = useGetUsersByRoleQuery(args);
    const [deleteUser, result] = useDeleteUserMutation();

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteUser,
        isLoading: isLoading || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={<SortForm config={sortConfig} handleSubmit={sortFn} />}
        />
    );
};

export default CustomersList;
