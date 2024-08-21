import { useAddProductMutation } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import ProductForm from "@/forms/ProductForm";

const ProductAdd = () => {
    const [addProduct, result] = useAddProductMutation();

    const handleSubmit = (values: Product) => {
        addProduct(values);
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
