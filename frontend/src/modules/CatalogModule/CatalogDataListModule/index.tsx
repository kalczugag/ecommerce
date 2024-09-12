import { useFilterProps, useFilter } from "@/hooks/useFilter";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ProductsList from "../components/ProductsList";
import Loading from "@/components/Loading";
import { Product } from "@/types/Product";

interface CatalogDataListModuleProps {
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

const CatalogDataListModule = ({ config }: CatalogDataListModuleProps) => {
    const { data, pageSize, page, isLoading, handlePageChange } = config;

    const simplifiedData = useFilterProps(data || []);
    const { handleSubmit, filteredData } = useFilter(
        data || [],
        simplifiedData.maxPrice
    );

    const count = Math.ceil(config.total / pageSize);

    return (
        <Loading isLoading={isLoading}>
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
                {filteredData.length > 0 ? (
                    <ProductsList data={filteredData} />
                ) : (
                    <div>No products available for this category.</div>
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default CatalogDataListModule;
