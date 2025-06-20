import { createColumnHelper } from "@tanstack/react-table";
import {
    useLazyGetAllCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import TableActions from "@/components/Table2/components/TableActions";
import CrudModule from "@/modules/CrudModule";
import type { Category } from "@/types/Category";

const columnHelper = createColumnHelper<Category>();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("_parentCategory", {
        header: "Parent Category",
        cell: (info) => info.getValue()?.name || "",
    }),
    columnHelper.accessor("level", {
        header: "Level",
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <ActionCell row={row} />,
    }),
];

const ActionCell = ({ row }: { row: any }) => {
    const { handleMutation } = useHandleMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = (id: string) => {
        alert(
            "Delete functionality is disabled for now. Please check the code comments."
        );
        // handleMutation({
        //     values: id,
        //     mutation: deleteCategory,
        //     successMessage: "Category deleted successfully",
        //     errorMessage: "Failed to delete category",
        // });
    };

    return (
        <TableActions id={row.original._id || ""} handleDelete={handleDelete} />
    );
};

const CategoriesList = () => {
    useTitle("Categories - List");

    return (
        <CrudModule columns={columns} queryFn={useLazyGetAllCategoriesQuery} />
    );
};

export default CategoriesList;
