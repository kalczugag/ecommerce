import ActionButtons from "@/components/Table/ActionButtons";
import type { Category } from "@/types/Category";
import type { SortConfigProps } from "@/pages/Products/list/config";

interface RowProps extends Category {
    isLoading: boolean;
    handleDelete: () => void;
}

export const sortConfig: SortConfigProps[] = [
    {
        label: "Level",
        criteria: "level",
        items: [
            { label: "Top Level", value: { level: "topLevel" } },
            { label: "Second Level", value: { level: "secondLevel" } },
            { label: "Third Level", value: { level: "thirdLevel" } },
        ],
    },
];

export const tableConfig = [
    {
        label: "Name",
        render: (row: RowProps) => row.name,
    },
    {
        label: "Description",
        render: (row: RowProps) => row.description || "-",
    },
    {
        label: "Parent Category",
        render: (row: RowProps) => row.parentCategory?.name || "-",
    },
    {
        label: "level",
        render: (row: RowProps) => row.level,
    },
    {
        label: "Actions",
        render: (row: RowProps) => (
            <ActionButtons
                id={row._id || ""}
                disabled={row.isLoading}
                handleDelete={row.handleDelete}
            />
        ),
    },
];
