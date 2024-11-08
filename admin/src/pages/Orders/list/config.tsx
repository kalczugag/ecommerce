import type { Order } from "@/types/Order";
import { Status } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Order {
    isLoading: boolean;
}

export const sortConfig = [
    {
        label: "Sort By Price",
        criteria: "total",
        items: [
            { label: "Low to high", value: { sort: "total" } },
            { label: "High to low", value: { sort: "-total" } },
        ],
    },
    {
        label: "Status",
        criteria: "status",
        items: [
            { label: "Placed", value: { status: "placed" } },
            { label: "Confirmed", value: { status: "confirmed" } },
            { label: "Shipped", value: { status: "shipped" } },
            { label: "In Delivery", value: { status: "in_delivery" } },
            { label: "Delivered", value: { status: "delivered" } },
            { label: "Cancelled", value: { status: "cancelled" } },
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
