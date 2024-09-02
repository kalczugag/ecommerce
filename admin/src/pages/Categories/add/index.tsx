import { useAddCategoryMutation } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import CategoryForm from "@/forms/CategoryForm";
import type { Category } from "@/types/Category";
import { useNavigate } from "react-router-dom";

const CategoriesAdd = () => {
    const navigate = useNavigate();
    const [addCategory, result] = useAddCategoryMutation();

    const handleSubmit = async (values: Category) => {
        await addCategory({
            ...values,
            parentCategory: values.parentCategory?._id,
        });
        navigate(-1);
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={result.isLoading}
                    formElements={<CategoryForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CategoriesAdd;
