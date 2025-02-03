import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import DetailCard from "@/components/DetailCard";
import Table from "@/components/Table";
import SearchProducts from "../../components/SearchProducts";
import AdvancedSearch from "../../components/AdvancedSearch";
import type { Order } from "@/types/Order";
import { Form } from "react-final-form";
import { tableConfig } from "./tableConfig";
import usePagination from "@/hooks/usePagination";
import { useGetAllProductsQuery } from "@/store";

interface AddProductProps extends ManageAction {
    data: Order;
}

const AddProduct = ({ handleSubTabChange }: AddProductProps) => {
    const [pagination] = usePagination();

    const { data, isFetching } = useGetAllProductsQuery(pagination);

    const handleAddProduct = (values: any) => {
        console.log(values);
    };

    const handleSearch = (values: any) => {
        console.log(values);
    };

    const enhancedTableData = data?.data
        ? data.data.map((row) => ({
              ...row,
              handleAddProduct,
          }))
        : data?.data;

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
                                    form={form}
                                    handleBack={() => handleSubTabChange(0)}
                                />
                            </DetailCard>
                        </DetailCard>
                    </form>
                )}
            />
            <DetailCard label="Add Product">
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
