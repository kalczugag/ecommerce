import { useGetAllOrdersQuery } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const OrdersList = () => {
    useTitle("Orders");

    const { data, isLoading } = useGetAllOrdersQuery();

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data || [],
        isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={<SortForm config={sortConfig} handleSubmit={sortFn} />}
        />
    );
};

export default OrdersList;
