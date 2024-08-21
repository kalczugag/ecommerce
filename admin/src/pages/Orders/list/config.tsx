import type { Order } from "@/types/Order";
import { Status } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Order {
    isLoading: boolean;
}

export const sortConfig = [
    {
        label: "Sort By Price",
        items: [
            { label: "Low to high", value: "asc" },
            { label: "High to low", value: "desc" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Number of items",
        render: (row: RowProps) => (
            <span className="font-bold">
                {row.items.length} {row.items.length > 1 ? "items" : "item"}
            </span>
        ),
    },
    {
        label: "Payment Method",
        render: (row: RowProps) => row.paymentMethod,
    },
    {
        label: "Price",
        render: (row: RowProps) => `$${row.total}`,
    },
    {
        label: "Id",
        render: (row: RowProps) => row._id!,
    },
    {
        label: "Status",
        render: (row: RowProps) => (
            <div className="flex justify-end">
                <Status status={row.status} />
            </div>
        ),
    },
    {
        label: "Actions",
        render: (row: RowProps) => <ActionButtons id={row._id!} info />,
    },
];
