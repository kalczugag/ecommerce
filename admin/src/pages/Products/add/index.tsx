import { useAddProductMutation, useGetGroupedCategoriesQuery } from "@/store";
import { enqueueSnackbar } from "notistack";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import ProductForm from "@/forms/ProductForm";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";

const ProductAdd = () => {
    const navigate = useNavigate();
    useTitle("Product - Add");

    const { data, isLoading } = useGetGroupedCategoriesQuery({
        sorted: true,
        named: true,
    });
    const [addProduct, result] = useAddProductMutation();

    const handleSubmit = async (values: Product) => {
        const { quantity, ...rest } = values;

        try {
            await addProduct({
                ...rest,
                imageUrl: (values.imageUrl as string)?.trim().split(","),
            }).unwrap();
            navigate("/products");
            enqueueSnackbar("product added successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to add product", {
                variant: "error",
            });
        }
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={result.isLoading}
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

export default ProductAdd;
