import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import ProductsDataListModule from "@/modules/ProductsModule/ProductsDataListModule";
import useFilters from "@/hooks/useFilters";

const ROWS_PER_PAGE = 8;

const generateTitle = (params: Record<string, string>) => {
    return Object.values(params)
        .filter(Boolean)
        .map((level) => level.charAt(0).toUpperCase() + level.slice(1))
        .join(" - ");
};

const Catalog = () => {
    const {
        topLevel = "",
        secondLevel = "",
        thirdLevel = "",
    } = useParams<Record<string, string>>();
    const [handlePageChange, page] = usePagination();
    const { filters, updateFilters } = useFilters();

    const title = generateTitle({ topLevel, secondLevel, thirdLevel });
    useTitle(title);

    const category = [topLevel, secondLevel, thirdLevel]
        .filter(Boolean)
        .join(",");

    const { data, isLoading, isFetching } = useGetAllProductsQuery({
        skip: page - 1,
        limit: ROWS_PER_PAGE,
        category,
        ...filters,
    });

    const handleFilters = (value: { sort: string; [key: string]: any }) => {
        const { sort, ...rest } = value;

        updateFilters({ sort, ...rest });
    };

    const config = {
        data: data?.data || [],
        pageSize: ROWS_PER_PAGE,
        page,
        category,
        total: data?.count || 0,
        isLoading,
        isFetching,
        handlePageChange,
        handleFilters,
    };

    return <ProductsDataListModule config={config} />;
};

export default Catalog;
