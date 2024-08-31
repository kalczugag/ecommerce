import { useParams } from "react-router-dom";
import {
    useGetCategoryByIdQuery,
    useEditCategoryMutation,
    useGetChildrensQuery,
} from "@/store";
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
    const { data: childrenData, isSuccess: childrenIsSuccess } =
        useGetChildrensQuery(id || "");
    const [editCategory, result] = useEditCategoryMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = (values: Category) => {
        editCategory(values);
    };

    const hasChildren =
        childrenIsSuccess && childrenData?.length > 0 ? true : false;

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
                            hasChildren={hasChildren}
                            isLoading={result.isLoading}
                            isUpdateForm
                        />
                    }
                />
            }
        />
    );
};

export default CategoriesEdit;
