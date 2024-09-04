import { useGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { usePagination } from "@/hooks/usePagination";
import { sortConfig, tableConfig } from "./config";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";

const ProductsList = () => {
    const pagination = usePagination();
    useTitle("Products");

    const { data, isLoading } = useGetAllProductsQuery(pagination);
    const [deleteProduct, result] = useDeleteProductMutation();

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteProduct,
        isLoading: isLoading || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={<SortForm config={sortConfig} handleSubmit={sortFn} />}
        />
    );
};

export default ProductsList;
