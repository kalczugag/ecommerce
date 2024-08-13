import { useTitle } from "@/hooks/useTitle";
import { useGetAllProductsQuery } from "@/store";
import CrudModule from "@/modules/CrudModule";
import { sortConfig, tableConfig } from "./config";

const ProductsList = () => {
    useTitle("Products");

    const { data } = useGetAllProductsQuery();

    if (!data) {
        return <div>no products</div>;
    }

    const sortFn = (values: any) => {
        console.log(values);
    };

    const fields = {
        tableConfig,
        data,
    };

    console.log(fields);

    return (
        <CrudModule
            config={sortConfig}
            fields={tableConfig}
            data={data}
            sortFn={sortFn}
        />
    );
};

export default ProductsList;
