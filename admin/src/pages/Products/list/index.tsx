import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";

const ProductsList = () => {
    useTitle("Products");

    const sortFn = (values: any) => {
        console.log(values);
    };

    return (
        <CrudModule
            config={{
                displayLabels: ["Category", "Availability", "Sort By Price"],
                fields: [
                    {
                        for: "Category",
                        items: [
                            { label: "dresses", value: "dress" },
                            { label: "shoes", value: "shoes" },
                        ],
                    },
                    {
                        for: "Availability",
                        items: [
                            { label: "more than 10", value: "more than 10" },
                            { label: "less than 10", value: "less than 10" },
                        ],
                    },
                    {
                        for: "Sort By Price",
                        items: [
                            { label: "Low to high", value: "asc" },
                            { label: "High to low", value: "desc" },
                        ],
                    },
                ],
            }}
            sortFn={sortFn}
            fields={[
                { label: "Name", value: "name" },
                { label: "sdfigj0", value: "sdfigj0" },
                { label: "ZDSo", value: "ZDSo" },
            ]}
        />
    );
};

export default ProductsList;
