import type { Order } from "@/types/Order";
import { Status } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Order {
    isLoading: boolean;
}

export const sortConfig: SortConfigProps[] = [
    {
        label: "Sort By Price",
        criteria: "sort",
        items: [
            { label: "Low to high", value: "total" },
            { label: "High to low", value: "-total" },
        ],
    },
    {
        label: "Status",
        criteria: "status",
        items: [
            { label: "Placed", value: "placed" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Shipped", value: "shipped" },
            { label: "In Delivery", value: "in_delivery" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Number of items",
        render: (row: RowProps) =>
            row.items.reduce((a, b) => a + b.quantity, 0).toString(),
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
