import { Form } from "react-final-form";
import { useTitle } from "@/hooks/useTitle";
import { useGetAllProductsQuery } from "@/store";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import NotFound from "@/components/NotFound";
import { sortConfig, tableConfig } from "./config";

const ProductsList = () => {
    useTitle("Products");

    const { data, isSuccess } = useGetAllProductsQuery();

    if (!data && isSuccess) {
        return <NotFound />;
    }

    const sortFn = (values: any) => {
        console.log(values);
    };

    const FormContainer = () => (
        <Form
            onSubmit={sortFn}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4"
                >
                    <SortForm config={sortConfig} form={form} />
                </form>
            )}
        />
    );

    return (
        <CrudModule
            config={{
                topLabel: "Sort",
                bottomLabel: "All Products",
            }}
            actionForm={<FormContainer />}
            fields={tableConfig}
            data={data}
            handleSubmit={sortFn}
        />
    );
};

export default ProductsList;
