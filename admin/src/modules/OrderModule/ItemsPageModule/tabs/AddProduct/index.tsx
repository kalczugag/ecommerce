import { useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useGetAllProductsQuery } from "@/store";
import usePagination from "@/hooks/usePagination";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import DetailCard from "@/components/DetailCard";
import Table from "@/components/Table";
import SearchProducts from "../../components/SearchProducts";
import AdvancedSearch from "../../components/AdvancedSearch";
import type { Order } from "@/types/Order";
import { tableConfig } from "./tableConfig";

interface AddProductProps extends ManageAction {
    orderData: Order;
}

interface FormValues {
    title: string;
    sku: string;
    brand: string;
    category: string;
}

const AddProduct = ({ orderData, handleSubTabChange }: AddProductProps) => {
    const [pagination] = usePagination();
    const [filters, setFilters] = useState({});

    const { data, isFetching } = useGetAllProductsQuery({
        ...pagination,
        ...filters,
    });

    const handleReset = (form: any) => {
        form.reset();
        setFilters({});
    };

    const handleSearch = (values: FormValues) => {
        const filter: any = {};

        let textSearch = "";

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                if (
                    key === "title" ||
                    key === "brand" ||
                    key === "color" ||
                    key === "sku"
                ) {
                    textSearch += `${value} `;
                } else {
                    filter[key] = value;
                }
            }
        });

        if (textSearch) {
            filter.$text = { $search: textSearch.trim() };
        }

        setFilters({
            filter,
        });
    };

    const enhancedTableData = useMemo(() => {
        return data?.result
            ? data?.result.map((row) => ({
                  ...row,
                  shipments: orderData.shipments,
              }))
            : [];
    }, [data?.result, orderData.shipments]);

    return (
        <div className="flex flex-col space-y-4">
            <Form
                onSubmit={handleSearch}
                render={({ handleSubmit, form }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <DetailCard label="Search Product">
                            <SearchProducts />
                            <DetailCard
                                variant="accordion"
                                label="Advanced Search Options"
                                className="px-2"
                                defaultExpanded
                            >
                                <AdvancedSearch
                                    handleReset={() => handleReset(form)}
                                    handleBack={() => handleSubTabChange(0)}
                                />
                            </DetailCard>
                        </DetailCard>
                    </form>
                )}
            />
            <DetailCard
                label={`Add Product - Found ${
                    data?.count &&
                    `${data.count} ${data.count > 1 ? "results" : "result"}`
                }`}
            >
                <Table
                    headerOptions={tableConfig}
                    totalItems={data?.count}
                    rowData={enhancedTableData || []}
                    isLoading={isFetching}
                />
            </DetailCard>
        </div>
    );
};

export default AddProduct;
