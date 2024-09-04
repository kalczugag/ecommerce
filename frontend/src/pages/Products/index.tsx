import { useGetAllProductsQuery } from "@/store";
import { useFilter, useFilterProps } from "@/hooks/useFilter";
import usePagination from "@/hooks/usePagination";
import CatalogModule from "@/modules/CatalogModule";

const ROWS_PER_PAGE = 8;

const Products = () => {
    const [handlePageChange, page] = usePagination();

    const { data, isLoading } = useGetAllProductsQuery({
        page: page - 1,
        pageSize: ROWS_PER_PAGE,
    });

    const simplifiedData = useFilterProps(data?.data || []);
    const { handleSubmit, filteredData } = useFilter(
        data?.data || [],
        simplifiedData.maxPrice
    );

    const config = {
        pageSize: ROWS_PER_PAGE,
        page: page,
        total: data?.count || 0,
        isLoading,
        filteredData,
        simplifiedData,
        handlePageChange,
    };

    return <CatalogModule config={config} handleSubmit={handleSubmit} />;
};

export default Products;
