import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    useTitle("Categories - Edit");

    const { data, isError, isLoading } = useGetCategoryByIdQuery(id || "");
    const { data: childrenData, isSuccess: childrenIsSuccess } =
        useGetChildrensQuery(id || "");
    const [editCategory, result] = useEditCategoryMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = async (values: Category) => {
        await editCategory(values);
        navigate(-1);
    };

    const hasChildren =
        childrenIsSuccess && childrenData?.length > 0 ? true : false;

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading || result.isLoading}
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
