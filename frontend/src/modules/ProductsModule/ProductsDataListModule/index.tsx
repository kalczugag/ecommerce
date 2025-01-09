import { useGetProductFiltersQuery } from "@/store";
import { Pagination } from "@mui/material";
import DefaultLayout from "@/layouts/DefaultLayout";
import { categoriesNameMap } from "@/constants/breadcrumbs";
import Sidebar from "@/components/Sidebar";
import SortBar from "@/components/SortBar";
import Loading from "@/components/Loading";
import RouterBreadcrumbs from "@/components/RouterBreadcrumbs";
import ProductsList from "./components/ProductsList";
import type { Product } from "@/types/Product";

const categoryLabel = (category: string) => {
    const categoriesArray = category
        .split(",")
        .map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1));

    const result =
        categoriesArray.length === 1
            ? `${categoriesArray[0]} Products`
            : categoriesArray.length === 2
            ? `${categoriesArray[0]} ${categoriesArray[1]}`
            : `${categoriesArray[0]} ${
                  categoriesArray[categoriesArray.length - 1]
              }`;

    return result;
};

interface ProductsDataListModuleProps {
    config: {
        data: Product[];
        pageSize: number;
        page: number;
        category: string;
        total: number;
        isLoading: boolean;
        isFetching: boolean;
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
        isFetching,
        handlePageChange,
        handleFilters,
    } = config;
    const { data: productFilters } = useGetProductFiltersQuery(category);

    const count = Math.ceil((config.total ?? 0) / pageSize);

    return (
        <Loading isLoading={isFetching}>
            <DefaultLayout
                pagination={
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ marginTop: "60px", alignSelf: "center" }}
                    />
                }
                topContent={
                    <div className="flex flex-col space-y-4 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <RouterBreadcrumbs
                                breadcrumbNameMap={categoriesNameMap}
                            />
                            <SortBar />
                        </div>
                        <h2 className="text-3xl font-bold">
                            {categoryLabel(category)}
                        </h2>
                    </div>
                }
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
        </Loading>
    );
};

export default ProductsDataListModule;
