import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "@/store";
import { useFilter, useFilterProps } from "@/hooks/useFilter";
import usePagination from "@/hooks/usePagination";
import CatalogModule from "@/modules/CatalogModule";

const ROWS_PER_PAGE = 8;

const Catalog = () => {
    const { topLevel, secondLevel, thirdLevel } = useParams();
    const [handlePageChange, page] = usePagination();

    const category = `${topLevel || ""},${secondLevel || ""},${
        thirdLevel || ""
    }`;

    const { data, isFetching, isError } = useGetAllProductsQuery({
        page: page - 1,
        pageSize: ROWS_PER_PAGE,
        category,
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
        isLoading: isFetching,
        filteredData: isError || data?.data.length === 0 ? [] : filteredData,
        simplifiedData,
        handlePageChange,
    };

    return <CatalogModule config={config} handleSubmit={handleSubmit} />;
};

export default Catalog;
