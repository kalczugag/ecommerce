import { useMemo } from "react";
import { Field } from "react-final-form";
import { createColumnHelper } from "@tanstack/react-table";
import { useLazyGetAllOrdersQuery } from "@/store";
import dayjs from "dayjs";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import UnderlineLink from "@/components/UnderlineLink";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Order } from "@/types/Order";
import { Stack, Typography, TextField } from "@mui/material";
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

    const filterElements = useMemo(() => {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={2}>
                    <Field name="createdAt">
                        {({ input }) => {
                            const value = input.value
                                ? dayjs(input.value)
                                : null;

                            return (
                                <DatePicker
                                    label="Order date"
                                    value={value}
                                    onChange={input.onChange}
                                />
                            );
                        }}
                    </Field>
                    <Field name="search">
                        {({ input }) => (
                            <TextField
                                {...input}
                                placeholder="Search customer or order number..."
                                fullWidth
                            />
                        )}
                    </Field>
                </Stack>
            </LocalizationProvider>
        );
    }, []);

    return (
        <CrudModule
            actionForm={filterElements}
            columns={columns}
            queryFn={useLazyGetAllOrdersQuery}
        />
    );
};

export default OrdersList;
