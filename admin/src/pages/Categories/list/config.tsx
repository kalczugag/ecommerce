import ActionButtons from "@/components/Table/ActionButtons";
import type { Category } from "@/types/Category";

interface RowProps extends Category {
    isLoading: boolean;
    handleDelete: () => void;
}

export const sortConfig = [
    {
        label: "Level",
        items: [
            { label: "Top Level", value: "1" },
            { label: "Second Level", value: "2" },
            { label: "Third Level", value: "3" },
        ],
    },
    {
        label: "Number of children",
        items: [
            { label: "More than 10", value: "more than 0" },
            { label: "Less than 10", value: "less than 0" },
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
