import { useAddProductMutation, useGetAllCategoriesQuery } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import ProductForm from "@/forms/ProductForm";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetAllCategoriesQuery({});
    const [addProduct, result] = useAddProductMutation();

    const handleSubmit = async (values: Product) => {
        await addProduct(values);
        navigate(-1);
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={result.isLoading}
                    formElements={<ProductForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default ProductAdd;
