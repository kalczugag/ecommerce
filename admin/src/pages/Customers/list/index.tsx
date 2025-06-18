import { createColumnHelper } from "@tanstack/react-table";
import { useLazyGetAllUsersQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    Grid2 as Grid,
    Stack,
    Typography,
} from "@mui/material";
import Table2 from "@/components/Table2";
import TableActions from "@/components/Table2/components/TableActions";
import type { User } from "@/types/User";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
        size: 32,
    }),
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        header: "Name",
        cell: (info) => {
            const user = info.row.original;

            return (
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
                            {user.email}
                        </Typography>
                    </Stack>
                </Stack>
            );
        },
    }),
    columnHelper.accessor("phone", {
        header: "Phone number",
        cell: (info) => info.getValue() ?? "-",
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("_role.name", {
        header: "Role",
        cell: (info) => (
            <Chip
                size="small"
                variant="outlined"
                color="primary"
                label={info.getValue()}
            />
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <TableActions id={row.original._id || ""} />,
    }),
];
const CustomersList = () => {
    useTitle("Customers - List");

    return (
        <div>
            <Table2<User> columns={columns} queryFn={useLazyGetAllUsersQuery} />
        </div>
    );
};

export default CustomersList;
