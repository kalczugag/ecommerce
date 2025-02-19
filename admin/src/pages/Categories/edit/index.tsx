import { useNavigate, useParams } from "react-router-dom";
import {
    useGetCategoryByIdQuery,
    useEditCategoryMutation,
    useGetChildrensQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { enqueueSnackbar } from "notistack";
import CrudModule from "@/modules/CrudModule";
import UpdateForm from "@/components/UpdateForm";
import NotFound from "@/components/NotFound";
import CategoryForm from "@/forms/CategoryForm";
import type { Category } from "@/types/Category";

const CategoriesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Category - Edit");

    const { data, isError, isLoading } = useGetCategoryByIdQuery(id || "");
    const { data: childrenData, isSuccess: childrenIsSuccess } =
        useGetChildrensQuery(id || "");
    const [editCategory, result] = useEditCategoryMutation();

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    const handleSubmit = async (values: Category) => {
        try {
            await editCategory(values).unwrap();
            navigate(-1);
            enqueueSnackbar("Category updated successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to update category", {
                variant: "error",
            });
        }
    };

    const hasChildren =
        childrenIsSuccess && childrenData?.result.length > 0 ? true : false;

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data?.result}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading || result.isLoading}
                    formElements={
                        <CategoryForm
                            level={data?.result.level}
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
