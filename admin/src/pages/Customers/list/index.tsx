import { createColumnHelper } from "@tanstack/react-table";
import { useDeleteUserMutation, useLazyGetAllUsersQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import {
    Avatar,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import TableActions from "@/components/Table2/components/TableActions";
import type { User } from "@/types/User";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import CrudModule from "@/modules/CrudModule";
import { useMemo } from "react";
import { Field } from "react-final-form";
import SearchItem from "@/components/SearchItem";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: "firstName",
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
        sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("phone", {
        header: "Phone number",
        cell: (info) => info.getValue() ?? "-",
        sortingFn: "basic",
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
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
        sortingFn: "alphanumeric",
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <ActionCell row={row} />,
    }),
];

const ActionCell = ({ row }: { row: any }) => {
    const { handleMutation } = useHandleMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = (id: string) => {
        handleMutation({
            values: id,
            mutation: deleteUser,
            successMessage: "User deleted successfully",
            errorMessage: "Failed to delete user",
        });
    };

    return (
        <TableActions id={row.original._id || ""} handleDelete={handleDelete} />
    );
};

const roles = ["admin", "client"];

const CustomersList = () => {
    useTitle("Customers - List");

    const filterElements = useMemo(
        () => (
            <Stack direction="row" spacing={2}>
                <Field name="_role.name">
                    {({ input }) => (
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                {...input}
                                input={<OutlinedInput label="Role" />}
                            >
                                {roles.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Field>
                <SearchItem />
            </Stack>
        ),
        []
    );

    return (
        <CrudModule
            actionForm={filterElements}
            columns={columns}
            queryFn={useLazyGetAllUsersQuery}
        />
    );
};

export default CustomersList;
