import moment from "moment";
import ActionButtons from "@/components/Table/ActionButtons";
import type { Order } from "@/types/Order";
import UnderlineLink from "@/components/UnderlineLink";
import StatusChip from "@/components/StatusChip";
import { TableColumnProps } from "@/modules/CrudModule";
import { Box, Grid, Stack, Typography } from "@mui/material";

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
            <UnderlineLink to={`/orders/${row._id}`}>
                {row.orderNumber}
            </UnderlineLink>
        ),
    },
    {
        label: "Customer",
        render: (row) => (
            <Stack direction="column">
                <Typography variant="body2">
                    {row._user.firstName} {row._user.lastName}
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary", fontSize: 12 }}
                >
                    {row._user.email}
                </Typography>
            </Stack>
        ),
    },
    {
        label: "Amount",
        render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Order Status",
        render: (row) => (
            <StatusChip status={row.status || ""} type="order" size="small" />
        ),
    },
    {
        label: "Payment",
        render: (row) => {
            const paymentStatus = row.payments?.[0]?.paymentStatus || "no data";
            return (
                <StatusChip
                    status={paymentStatus}
                    type="payment"
                    size="small"
                />
            );
        },
    },
    {
        label: "Date",
        render: (row: RowProps) => {
            const date = moment(row.createdAt).format("DD MMM YYYY");
            const time = moment(row.createdAt).format("hh:mm A");

            return (
                <Stack direction="column">
                    <Typography variant="body2" fontWeight="normal">
                        {date}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", fontSize: 12 }}
                    >
                        {time}
                    </Typography>
                </Stack>
            );
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
