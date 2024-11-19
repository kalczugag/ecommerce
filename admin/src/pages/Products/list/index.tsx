import { useGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";
import useDebounce from "@/hooks/useDebounce";

const ProductsList = () => {
    const [pagination] = usePagination();
    useTitle("Products - List");

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllProductsQuery({
        ...pagination,
        ...sortCriteria,
    });

    const [deleteProduct, result] = useDeleteProductMutation();

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((searchTerm: { search: string }) => {
        const filter = {
            $or: [{ brand: searchTerm.search }, { title: searchTerm.search }],
        };

        setSortCriteria({ filter });
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
