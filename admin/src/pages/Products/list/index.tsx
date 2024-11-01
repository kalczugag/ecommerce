import { useGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import { sortConfig, tableConfig } from "./config";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import { useEffect } from "react";

const ProductsList = () => {
    const [pagination] = usePagination();
    useTitle("Products - List");

    const { data, isFetching } = useGetAllProductsQuery(pagination);
    const [deleteProduct, result] = useDeleteProductMutation();

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

    useEffect(() => {
        console.log(sortedData);
    }, [sortedData]);

    const config = {
        tableConfig,
        tableData: sortedData,
        total: data?.count || 0,
        action: deleteProduct,
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

export default ProductsList;
