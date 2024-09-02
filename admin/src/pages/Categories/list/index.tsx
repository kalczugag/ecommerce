import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import { Button } from "@mui/material";

const CategoriesList = () => {
    useTitle("Categories");
    const navigate = useNavigate();

    const { data, isLoading } = useGetAllCategoriesQuery();
    const [deleteCategory, result] = useDeleteCategoryMutation();

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {
        tableConfig,
        tableData: data || [],
        action: deleteCategory,
        isLoading: isLoading || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                    <SortForm config={sortConfig} handleSubmit={sortFn} />
                    <Button
                        variant="contained"
                        onClick={() => navigate("/categories/add")}
                    >
                        Add Category
                    </Button>
                </div>
            }
        />
    );
};

export default CategoriesList;
