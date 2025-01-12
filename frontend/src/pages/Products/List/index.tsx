import { useParams } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
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
    const { filters, updateFilters } = useFilters();

    const title = generateTitle({ topLevel, secondLevel, thirdLevel });
    useTitle(title);

    const category = [topLevel, secondLevel, thirdLevel]
        .filter(Boolean)
        .join(",");

    const handleFilters = (value: { sort: string; [key: string]: any }) => {
        const { sort, ...rest } = value;

        updateFilters({ sort, ...rest });
    };

    const config = {
        pageSize: ROWS_PER_PAGE,
        category,
        handleFilters,
    };

    return <ProductsDataListModule config={config} />;
};

export default Catalog;
