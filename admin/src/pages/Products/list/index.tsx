import { useGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import { sortConfig, tableConfig } from "./config";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";
import useDebounce from "@/hooks/useDebounce";

const ProductsList = () => {
    const [pagination] = usePagination();
    useTitle("Products - List");

    const { queryConfig, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllProductsQuery({
        ...pagination,
        ...queryConfig,
    });

    const [deleteProduct, result] = useDeleteProductMutation();

    const handleSort = (sortValues: any) => {
        const parsedSortCriteria = Object.entries(sortValues).map(
            ([label, value]) => ({ label, value: value as string })
        );
        setSortCriteria(parsedSortCriteria);
    };

    const handleSearch = useDebounce((searchTerm: string) => {
        setSortCriteria([
            { label: "brand", value: searchTerm },
            { label: "title", value: searchTerm },
        ]);
    }, 250);

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteProduct,
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
