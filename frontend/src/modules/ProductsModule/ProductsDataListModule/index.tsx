import DefaultLayout from "@/layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ProductsList from "./components/ProductsList";
import { Product } from "@/types/Product";
import { useGetProductFiltersQuery } from "@/store";

interface ProductsDataListModuleProps {
    config: {
        data: Product[];
        pageSize: number;
        page: number;
        category: string;
        total: number;
        isLoading: boolean;
        handlePageChange: (
            event: React.ChangeEvent<unknown>,
            value: number
        ) => void;
        handleFilters: (value: any) => void;
    };
}

const ProductsDataListModule = ({ config }: ProductsDataListModuleProps) => {
    const {
        data,
        pageSize,
        page,
        category,
        isLoading,
        handlePageChange,
        handleFilters,
    } = config;
    const { data: productFilters } = useGetProductFiltersQuery(category);

    const count = Math.ceil((config.total ?? 0) / pageSize);

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
            <Sidebar
                config={{
                    data: productFilters!,
                    disabled: !data.length,
                    onSubmit: handleFilters,
                }}
            />
            {isLoading ? (
                <ProductsList data={[]} isLoading={true} />
            ) : data.length > 0 ? (
                <ProductsList data={data} isLoading={false} />
            ) : (
                <div>No products available for this category.</div>
            )}
        </DefaultLayout>
    );
};

export default ProductsDataListModule;
