import { useGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";

const ProductsList = () => {
    const [pagination] = usePagination();
    useTitle("Products - List");
    const { handleMutation } = useHandleMutation();

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllProductsQuery({
        ...pagination,
        ...sortCriteria,
    });

    const [deleteProduct, result] = useDeleteProductMutation();

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((search: { search: string }) => {
        const filter = { $text: { $search: search.search } };

        setSortCriteria({ filter });
    }, 250);

    const handleDelete = (id: string) => {
        handleMutation({
            values: id,
            mutation: deleteProduct,
        });
    };

    const config = {
        tableConfig,
        tableData: data?.result || [],
        total: data?.count || 0,
        action: handleDelete,
        isLoading: isFetching || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={
                <div className="space-y-4">
                    <SearchItem handleSubmit={handleSearch} />
                    <SortForm config={sortConfig} handleSubmit={handleSort} />
                </div>
            }
        />
    );
};

export default ProductsList;
