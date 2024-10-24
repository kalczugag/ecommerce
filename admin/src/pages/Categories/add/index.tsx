import { useAddCategoryMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import CreateForm from "@/components/CreateForm";
import CrudModule from "@/modules/CrudModule";
import CategoryForm from "@/forms/CategoryForm";
import type { Category } from "@/types/Category";
import { useNavigate } from "react-router-dom";

const CategoriesAdd = () => {
    const navigate = useNavigate();
    const [addCategory, result] = useAddCategoryMutation();

    const handleSubmit = async (values: Category) => {
        try {
            await addCategory(values).unwrap();
            navigate(-1);
            enqueueSnackbar("Category added successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to add category", {
                variant: "error",
            });
        }
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
