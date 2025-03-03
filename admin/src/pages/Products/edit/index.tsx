import { useNavigate, useParams } from "react-router-dom";
import {
    useGetProductByIdQuery,
    useEditProductMutation,
    useGetGroupedCategoriesQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import NotFound from "@/components/NotFound";
import type { Product } from "@/types/Product";
import CrudModule from "@/modules/CrudModule";
import UpdateForm from "@/components/UpdateForm";
import ProductForm from "@/forms/ProductForm";

const ProductsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();
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
    } = useGetProductByIdQuery({
        id: id || "",
        params: {
            populate: "topLevelCategory secondLevelCategory thirdLevelCategory",
        },
    });
    const [editProduct, result] = useEditProductMutation();

    if (isError || (!productsLoading && !productsData?.result))
        return <NotFound />;

    const handleSubmit = async (values: Product) => {
        const { quantity, ...rest } = values;

        handleMutation({
            values: {
                ...rest,
                imageUrl: (values.imageUrl as string)?.trim().split(",\n"),
            },
            snackbar: false,
            mutation: editProduct,
            onSuccess: () => navigate(-1),
        });
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
