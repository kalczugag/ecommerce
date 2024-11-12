import { useFilterProps, useFilter } from "@/hooks/useFilter";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ProductsList from "../components/ProductsList";
import { Product } from "@/types/Product";
import { useGetProductFiltersQuery } from "@/store";

interface ProductsDataListModuleProps {
    config: {
        data: Product[];
        pageSize: number;
        page: number;
        total: number;
        isLoading: boolean;
        handlePageChange: (
            event: React.ChangeEvent<unknown>,
            value: number
        ) => void;
        handleSort: () => void;
    };
}

const ProductsDataListModule = ({ config }: ProductsDataListModuleProps) => {
    const { data, pageSize, page, isLoading, handlePageChange, handleSort } =
        config;

    const { data: productFilters } = useGetProductFiltersQuery();
    const { handleSubmit, filteredData } = useFilter(
        data || [],
        productFilters?.maxPrice || 100
    );

    const count = Math.ceil(config.total / pageSize);

    const sidebarConfig = {
        data: productFilters!,
        disabled: !filteredData.length,
        onSubmit: handleSubmit,
    };

    return (
        <DefaultLayout
            pagination={
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: "60px", alignSelf: "center" }}
                />
            }
            isCatalog
        >
            <Sidebar config={sidebarConfig} />
            {isLoading ? (
                <ProductsList data={filteredData} isLoading={true} />
            ) : filteredData.length > 0 ? (
                <ProductsList data={filteredData} isLoading={false} />
            ) : (
                <div>No products available for this category.</div>
            )}
        </DefaultLayout>
    );
};

export default ProductsDataListModule;
