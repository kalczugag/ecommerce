import { useGetAllUsersQuery } from "@/store";
import { createColumnHelper } from "@tanstack/react-table";
import Table2 from "@/components/Table2";
import type { User } from "@/types/User";
import { Checkbox } from "@mui/material";

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
    }),
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
        header: "Phone number",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
];

const Test = () => {
    const { data } = useGetAllUsersQuery({ limit: 99 });

    return (
        <div>
            <Table2<User>
                data={data?.result || []}
                columns={columns}
                rowCount={data?.count || 0}
            />
        </div>
    );
};

export default Test;
