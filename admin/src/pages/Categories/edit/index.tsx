import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery, useEditCategoryMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import UpdateForm from "@/components/UpdateForm";
import NotFound from "@/components/NotFound";
import CategoryForm from "@/forms/CategoryForm";
import type { Category } from "@/types/Category";

const CategoriesEdit = () => {
    const { id } = useParams();
    useTitle("Categories - Edit");

    const { data, isError, isLoading } = useGetCategoryByIdQuery(id || "");
    const [editCategory, result] = useEditCategoryMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = (values: Category) => {
        editCategory(values);
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    formElements={
                        <CategoryForm
                            level={data?.level}
                            isLoading={result.isLoading}
                        />
                    }
                />
            }
        />
    );
};

export default CategoriesEdit;
