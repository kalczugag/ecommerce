import { useAddCategoryMutation, useGetCategoriesByLevelQuery } from "@/store";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import CategoryForm from "@/forms/CategoryForm";
import type { Category } from "@/types/Category";

const CategoriesAdd = () => {
    const [addCategory, result] = useAddCategoryMutation();

    const handleSubmit = (values: Category) => {
        addCategory(values);
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
