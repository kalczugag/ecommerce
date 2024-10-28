import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import ProductsDataListModule from "@/modules/ProductsModule/ProductsDataListModule";

const ROWS_PER_PAGE = 8;

const Catalog = () => {
    const { topLevel, secondLevel, thirdLevel } =
        useParams<Record<string, string>>();
    const [handlePageChange, page] = usePagination();

    const title = [
        topLevel
            ? `${topLevel.charAt(0).toUpperCase() + topLevel.slice(1)}`
            : "",
        secondLevel
            ? `${secondLevel.charAt(0).toUpperCase() + secondLevel.slice(1)}`
            : "",
        thirdLevel
            ? `${thirdLevel.charAt(0).toUpperCase() + thirdLevel.slice(1)}`
            : "",
    ]
        .filter(Boolean)
        .join(" - ");

    useTitle(title ? title : "");

    const category = [topLevel, secondLevel, thirdLevel]
        .filter(Boolean)
        .join(",");

    const { data, isFetching } = useGetAllProductsQuery({
        page: page - 1,
        pageSize: ROWS_PER_PAGE,
        category,
    });

    const config = {
        data: data?.data || [],
        pageSize: ROWS_PER_PAGE,
        page: page,
        total: data?.count || 0,
        isLoading: isFetching,
        handlePageChange,
    };

    return <ProductsDataListModule config={config} />;
};

export default Catalog;
