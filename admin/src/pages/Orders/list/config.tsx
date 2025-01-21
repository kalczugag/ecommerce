import type { Order } from "@/types/Order";
import { Status } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";
import { Link } from "react-router-dom";
import moment from "moment";

interface RowProps extends Order {
    bolder: string;
    isLoading: boolean;
}

export const sortConfig: SortConfigProps[] = [
    {
        label: "Sort By Date",
        criteria: "sort",
        items: [
            { label: "Newer to Older", value: "-createdAt" },
            { label: "Older to Newer", value: "createdAt" },
        ],
    },
    {
        label: "Status",
        criteria: "status",
        items: [
            { label: "Placed", value: "placed" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Canceled", value: "canceled" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Order",
        render: (row: RowProps) => (
            <Link
                to={`/orders/${row._id}`}
                className="text-text-blue hover:underline"
            >
                {row._id}
            </Link>
        ),
    },
    {
        label: "Customer",
        render: (row: RowProps) =>
            row._user.firstName + " " + row._user.lastName,
    },
    {
        label: "Amount",
        render: (row: RowProps) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Order Status",
        render: (row: RowProps) => (
            <div className="bg-gray-300 text-center rounded truncate px-2">
                {row.status}
            </div>
        ),
    },
    {
        label: "Payment",
        render: (row: RowProps) => (
            <div
                className={`bg-gray-300 text-center rounded truncate px-2 ${
                    row._payment?.paymentStatus === "completed"
                        ? "bg-orange-500 text-white"
                        : !row._payment?.paymentStatus
                        ? ""
                        : "bg-green-400 text-white"
                }`}
            >
                {row._payment?.paymentStatus || "no data"}
            </div>
        ),
    },
    {
        label: "Date",
        render: (row: RowProps) => {
            const date = moment(row.createdAt).format("DD/MM/YYYY");
            return <div>{date}</div>;
        },
    },
    {
        label: "Actions",
        render: (row: RowProps) => (
            <ActionButtons
                id={row._id || ""}
                disabled={row.isLoading}
                component="button"
                element="View Order"
            />
        ),
    },
    // {
    //     label: "Number of items",
    //     render: (row: RowProps) =>
    //         row.items.reduce((a, b) => a + b.quantity, 0).toString(),
    // },
    // {
    //     label: "Payment Method",
    //     render: (row: RowProps) => row._payment?.paymentMethod || "",
    // },
    // {
    //     label: "Price",
    //     render: (row: RowProps) => `$${row.total}`,
    // },
    // {
    //     label: "Id",
    //     render: (row: RowProps) => (
    //         <div className={row.bolder ? "font-bold" : ""}>{row._id}</div>
    //     ),
    // },
    // {
    //     label: "Status",
    //     render: (row: RowProps) => (
    //         <div className="flex justify-end">
    //             <Status status={row.status} />
    //         </div>
    //     ),
    // },
    // {
    //     label: "Actions",
    //     render: (row: RowProps) => <ActionButtons id={row._id || ""} info />,
    // },
];
