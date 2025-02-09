import moment from "moment";
import ActionButtons from "@/components/Table/ActionButtons";
import type { Order } from "@/types/Order";
import UnderlineLink from "@/components/UnderlineLink";
import { TableColumnProps } from "@/modules/CrudModule";

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

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "Order",
        render: (row) => (
            <UnderlineLink to={`/orders/${row._id}`}>{row._id}</UnderlineLink>
        ),
    },
    {
        label: "Customer",
        render: (row) => row._user.firstName + " " + row._user.lastName,
    },
    {
        label: "Amount",
        render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Order Status",
        render: (row) => (
            <div className="bg-gray-300 text-center rounded truncate px-2">
                {row.status}
            </div>
        ),
    },
    {
        label: "Payment",
        render: (row) => {
            const paymentStatus = row.payments?.[0]?.paymentStatus || "no data";

            const statusClasses =
                paymentStatus === "completed"
                    ? "bg-orange-500 text-white"
                    : paymentStatus === "no data"
                    ? "bg-gray-300"
                    : "bg-green-400 text-white";

            return (
                <div
                    className={`text-center rounded truncate px-2 ${statusClasses}`}
                >
                    {paymentStatus}
                </div>
            );
        },
    },
    {
        label: "Date",
        render: (row) => {
            const date = moment(row.createdAt).format("DD/MM/YYYY");
            return <div>{date}</div>;
        },
    },
    {
        label: "Actions",
        render: (row) => (
            <ActionButtons
                id={row._id || ""}
                disabled={row.isLoading}
                component="button"
                element="View Order"
            />
        ),
    },
];
