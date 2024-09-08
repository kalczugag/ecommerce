import { SimplifiedDataProps, FilterProps } from "@/hooks/useFilter";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import ProductsList from "./components/ProductsList";
import Loading from "@/components/Loading";

interface CatalogModuleProps {
    config: {
        pageSize: number;
        page: number;
        total: number;
        isLoading: boolean;
        filteredData: FilterProps["filteredData"];
        simplifiedData: SimplifiedDataProps;
        handlePageChange: (
            event: React.ChangeEvent<unknown>,
            value: number
        ) => void;
    };
    handleSubmit: FilterProps["handleSubmit"];
}

const CatalogModule = ({ config, handleSubmit }: CatalogModuleProps) => {
    const {
        pageSize,
        page,
        isLoading,
        filteredData,
        simplifiedData,
        handlePageChange,
    } = config;

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

export default CatalogModule;
