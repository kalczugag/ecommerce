import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import { Button } from "@mui/material";
import SearchItem from "@/components/SearchItem";

const CategoriesList = () => {
    const [pagination] = usePagination();
    const navigate = useNavigate();
    useTitle("Categories - List");

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllCategoriesQuery({
        ...pagination,
        ...sortCriteria,
    });

    const [deleteCategory, result] = useDeleteCategoryMutation();

    const handleSort = (sortValues: Record<string, string>) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((search: { search: string }) => {
        const filter = { $text: { $search: search.search } };

        setSortCriteria({ filter });
    }, 250);

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
                <div className="space-y-4">
                    <SearchItem
                        handleSubmit={handleSearch}
                        placeholder="Search by name"
                    />
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                        <SortForm
                            config={sortConfig}
                            handleSubmit={handleSort}
                        />
                        <Button
                            variant="contained"
                            onClick={() => navigate("/categories/add")}
                        >
                            Add Category
                        </Button>
                    </div>
                </div>
            }
        />
    );
};

export default CategoriesList;
