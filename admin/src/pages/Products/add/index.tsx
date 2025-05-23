import { useAddProductMutation, useGetGroupedCategoriesQuery } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import ProductForm from "@/forms/ProductForm";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";

const ProductsAdd = () => {
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();
    useTitle("Product - Add");

    const { data, isLoading } = useGetGroupedCategoriesQuery({
        sorted: true,
        named: true,
    });
    const [addProduct, result] = useAddProductMutation();

    const handleSubmit = async (values: Product) => {
        const { quantity, ...rest } = values;

        handleMutation({
            values: {
                ...rest,
                imageUrl: (values.imageUrl as string)?.trim().split(","),
            },
            mutation: addProduct,
            onSuccess: () => navigate("/products"),
        });
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={result.isLoading}
                    formValuesDisplay
                    formElements={
                        <ProductForm
                            data={data?.result}
                            isLoading={result.isLoading || isLoading}
                        />
                    }
                />
            }
        />
    );
};

export default ProductsAdd;
