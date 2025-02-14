import { useNavigate, useParams } from "react-router-dom";
import {
    useGetProductByIdQuery,
    useEditProductMutation,
    useGetGroupedCategoriesQuery,
} from "@/store";
import { enqueueSnackbar } from "notistack";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import type { Product } from "@/types/Product";
import CrudModule from "@/modules/CrudModule";
import UpdateForm from "@/components/UpdateForm";
import ProductForm from "@/forms/ProductForm";

const ProductsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Product - Edit");

    const { data: categoriesData, isLoading: categoriesLoading } =
        useGetGroupedCategoriesQuery({
            sorted: true,
            named: true,
        });
    const {
        data: productsData,
        isError,
        isLoading: productsLoading,
    } = useGetProductByIdQuery(id || "");
    const [editProduct, result] = useEditProductMutation();

    if (isError || (!productsLoading && !productsData?.result))
        return <NotFound />;

    const handleSubmit = async (values: Product) => {
        const { quantity, ...rest } = values;

        try {
            await editProduct({
                ...rest,
                imageUrl: (values.imageUrl as string)?.trim().split(",\n"),
            }).unwrap();
            navigate(-1);
            enqueueSnackbar("Product updated successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to update product", {
                variant: "error",
            });
        }
    };

    const updatedInitialValues = {
        ...productsData?.result,
        imageUrl: (productsData?.result.imageUrl as string[])?.join(",\n"),
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={updatedInitialValues}
                    handleSubmit={handleSubmit}
                    isLoading={
                        productsLoading || categoriesLoading || result.isLoading
                    }
                    formElements={
                        <ProductForm
                            data={categoriesData?.result}
                            isLoading={result.isLoading}
                            isUpdateForm
                        />
                    }
                />
            }
        />
    );
};

export default ProductsEdit;
