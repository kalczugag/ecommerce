import { createColumnHelper, sortingFns } from "@tanstack/react-table";
import { useLazyGetAllOrdersQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import UnderlineLink from "@/components/UnderlineLink";
import type { Order } from "@/types/Order";
import { Stack, Typography } from "@mui/material";
import StatusChip from "@/components/StatusChip";
import TableActions from "@/components/Table2/components/TableActions";
import moment from "moment";

const columnHelper = createColumnHelper<Order>();

const columns = [
    columnHelper.accessor((row) => `#${row.orderNumber}`, {
        id: "orderNumber",
        header: "Order Number",
        cell: (info) => (
            <UnderlineLink to={`/orders/${info.row.original._id}`}>
                {info.getValue()}
            </UnderlineLink>
        ),
        sortingFn: "basic",
    }),
    columnHelper.accessor(
        (row) => `${row._user.firstName} ${row._user.firstName}`,
        {
            id: "_user.firstName",
            header: "Customer",

            cell: (info) => (
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <Avatar
                        src="/images/avatar.png"
                        sx={{ width: 40, height: 40 }}
                    /> */}
                    <Stack spacing={0.3}>
                        <Typography variant="body2">
                            {info.getValue()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {info.row.original._user.email}
                        </Typography>
                    </Stack>
                </Stack>
            ),
            sortingFn: "alphanumeric",
        }
    ),
    columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => {
            const date = moment(info.getValue()).format("DD MMM YYYY");
            const time = moment(info.getValue()).format("hh:mm A");

            return (
                <Stack direction="column" spacing={0.3}>
                    <Typography variant="body2">{date}</Typography>
                    <Typography
                        variant="subtitle2"
                        fontSize={12}
                        color="text.secondary"
                    >
                        {time}
                    </Typography>
                </Stack>
            );
        },
        sortingFn: "datetime",
    }),
    columnHelper.accessor("items", {
        header: "Items",
        cell: (info) => {
            const count = info
                .getValue()
                .reduce((acc, item) => acc + item.quantity, 0);

            return count;
        },
        sortingFn: "basic",
    }),
    columnHelper.accessor((row) => `$${row.total.toFixed(2)}`, {
        header: "Price",
        cell: (info) => info.getValue(),
        sortingFn: "basic",
    }),
    columnHelper.accessor("status", {
        header: "Status",

        cell: (info) => (
            <StatusChip
                status={info.getValue() || ""}
                type="order"
                size="small"
            />
        ),
        sortingFn: "alphanumeric",
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <ActionCell row={row} />,
    }),
];

const ActionCell = ({ row }: { row: any }) => {
    const handleDelete = (id: string) => {
        alert(
            `_id: ${id}\n\nOrder deletion is disabled for now. Please check the code comments.`
        );
    };

    return (
        <TableActions id={row.original._id || ""} handleDelete={handleDelete} />
    );
};

const OrdersList = () => {
    useTitle("Orders - List");

    return <CrudModule columns={columns} queryFn={useLazyGetAllOrdersQuery} />;
};

export default OrdersList;
