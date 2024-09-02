import { useGetUsersByRoleQuery, useDeleteUserMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const CustomersList = () => {
    useTitle("Customers");

    const { data, isLoading } = useGetUsersByRoleQuery("admin");
    const [deleteUser, result] = useDeleteUserMutation();

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data || [],
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
