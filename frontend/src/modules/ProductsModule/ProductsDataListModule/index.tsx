import { useFilterProps, useFilter } from "@/hooks/useFilter";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ProductsList from "../components/ProductsList";
import { Product } from "@/types/Product";

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
    };
}

const ProductsDataListModule = ({ config }: ProductsDataListModuleProps) => {
    const { data, pageSize, page, isLoading, handlePageChange } = config;

    const simplifiedData = useFilterProps(data || []);
    const { handleSubmit, filteredData } = useFilter(
        data || [],
        simplifiedData.maxPrice
    );

    const count = Math.ceil(config.total / pageSize);

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
                data={simplifiedData}
                disabled={!filteredData.length}
                onSubmit={handleSubmit}
            />
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
