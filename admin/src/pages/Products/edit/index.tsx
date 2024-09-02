import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useEditProductMutation } from "@/store";
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

    const { data, isError, isLoading } = useGetProductByIdQuery(id || "");
    const [editProduct, result] = useEditProductMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = async (values: Product) => {
        await editProduct(values);
        navigate(-1);
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading || result.isLoading}
                    formElements={<ProductForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default ProductsEdit;
