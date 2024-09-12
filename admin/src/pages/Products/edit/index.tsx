import { useNavigate, useParams } from "react-router-dom";
import {
    useGetProductByIdQuery,
    useEditProductMutation,
    useGetGroupedCategoriesQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import NotFound from "@/components/NotFound";
import type { Product } from "@/types/Product";
import CrudModule from "@/modules/CrudModule";
import UpdateForm from "@/components/UpdateForm";
import ProductForm from "@/forms/ProductForm";

const ProductsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Products - Edit");

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

    if (isError || (!productsLoading && !productsData)) return <NotFound />;

    const handleSubmit = async (values: Product) => {
        await editProduct({
            ...values,
            imageUrl: (values.imageUrl as string)?.trim().split(",\n"),
        });
        navigate(-1);
    };

    const updatedInitialValues = {
        ...productsData,
        imageUrl: (productsData?.imageUrl as string[])?.join(",\n"),
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
                            data={categoriesData?.data}
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
