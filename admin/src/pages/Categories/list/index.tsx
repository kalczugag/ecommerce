import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import { Button } from "@mui/material";

const CategoriesList = () => {
    const [pagination] = usePagination();
    const navigate = useNavigate();
    useTitle("Categories - List");

    const { queryConfig, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllCategoriesQuery({
        ...pagination,
        ...queryConfig,
    });

    const [deleteCategory, result] = useDeleteCategoryMutation();

    const handleSort = (sortValues: any) => {
        const parsedSortCriteria = Object.entries(sortValues).map(
            ([label, value]) => ({ label, value: value as string })
        );
        setSortCriteria(parsedSortCriteria);
    };

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteCategory,
        isLoading: isFetching || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                    <SortForm config={sortConfig} handleSubmit={handleSort} />
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
