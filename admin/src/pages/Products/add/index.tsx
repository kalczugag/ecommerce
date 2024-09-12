import { useAddProductMutation, useGetGroupedCategoriesQuery } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import ProductForm from "@/forms/ProductForm";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetGroupedCategoriesQuery({
        sorted: true,
        named: true,
    });
    const [addProduct, result] = useAddProductMutation();

    const handleSubmit = async (values: Product) => {
        await addProduct({
            ...values,
            imageUrl: (values.imageUrl as string)?.trim().split(","),
            size: [
                {
                    name: "S",
                    quantity: 20,
                },
                {
                    name: "M",
                    quantity: 30,
                },
                {
                    name: "L",
                    quantity: 50,
                },
            ],
        });
        navigate("/products");
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={result.isLoading}
                    formElements={
                        <ProductForm
                            data={data?.data}
                            isLoading={result.isLoading || isLoading}
                        />
                    }
                />
            }
        />
    );
};

export default ProductAdd;
