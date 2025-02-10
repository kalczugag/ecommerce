import { useState } from "react";
import { useGetProductFiltersQuery } from "@/store";
import DefaultLayout from "@/layouts/DefaultLayout";
import { categoriesNameMap } from "@/constants/breadcrumbs";
import Sidebar from "@/components/Sidebar";
import SortBar, { SortBarProps } from "@/components/SortBar";
import Loading from "@/components/Loading";
import RouterBreadcrumbs from "@/components/RouterBreadcrumbs";
import ProductsList from "./components/ProductsList";

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
        pageSize: number;
        category: string;
        handleFilters: (value: any) => void;
    };
}

const sortConfig = [
    {
        listLabel: "Price",
        elements: [
            { label: "Low to High", value: "price" },
            { label: "High to Low", value: "-price" },
        ],
    },
];

const ProductsDataListModule = ({ config }: ProductsDataListModuleProps) => {
    const { category, handleFilters } = config;
    const { data: productFilters } = useGetProductFiltersQuery(category);

    const [isFetching, setIsFetching] = useState(false);

    return (
        <Loading isLoading={isFetching}>
            <DefaultLayout
                topContent={
                    <div className="flex flex-col space-y-4 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <RouterBreadcrumbs
                                breadcrumbNameMap={categoriesNameMap}
                            />
                            <SortBar config={sortConfig} />
                        </div>
                        <h2 className="text-3xl font-bold">
                            {categoryLabel(category)}
                        </h2>
                    </div>
                }
                centered
            >
                <Sidebar
                    config={{
                        data: productFilters!,
                        // disabled: !data.length,
                        onSubmit: handleFilters,
                    }}
                />

                <ProductsList
                    category={category}
                    setIsFetching={setIsFetching}
                />
            </DefaultLayout>
        </Loading>
    );
};

export default ProductsDataListModule;
