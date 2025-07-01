import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table";
import TableContext, { useTableContext } from "@/contexts/TableContext";
import CrudLayout from "@/layouts/CrudLayout";
import Table, { type EnhancedTableProps } from "@/components/Table2";
import { Checkbox } from "@mui/material";
import TableFilters from "@/components/Table2/components/TableFilters";
import useDebounce from "@/hooks/useDebounce";

export interface CrudModuleProps<T>
    extends Omit<EnhancedTableProps<T>, "isLoading"> {
    actionForm?: ReactNode;
}

const createSelectColumn = <T extends object>(): ColumnDef<T, unknown> => ({
    id: "select",
    header: ({ table }) => (
        <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
        />
    ),
    enableSorting: false,
});

const CrudModule = <T extends object>({
    columns,
    queryFn,
    actionForm,
}: CrudModuleProps<T>) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilters] = useState<any>([]);

    const [trigger, { data, isFetching }] = queryFn();

    useEffect(() => {
        trigger(
            {
                skip: pagination.pageIndex,
                limit: pagination.pageSize,
                sort: sorting.map(
                    (s) => `${s.desc ? "-" : ""}${s.id.toLowerCase()}`
                ),
                filter: globalFilter,
            },
            true
        );
    }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter]);

    const extendedColumns = useMemo<ColumnDef<T, any>[]>(
        () => [createSelectColumn<T>(), ...columns],
        [columns]
    );

    const table = useReactTable({
        data: data?.result || [],
        columns: extendedColumns,
        rowCount: data?.count,
        state: {
            pagination,
            sorting,
            globalFilter,
        },
        enableRowSelection: true,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilters,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSubmit = useDebounce((values: any) => {
        setGlobalFilters({
            $or: [{ _id: values.search }, { _user: values.search }],
        });
    }, 300);

    useEffect(() => {
        console.log(globalFilter);
    }, [globalFilter]);

    return (
        <TableContext.Provider value={table}>
            <CrudLayout
                headerPanel={
                    <TableFilters onSubmit={handleSubmit}>
                        {actionForm}
                    </TableFilters>
                }
            >
                <Table
                    columns={columns}
                    queryFn={queryFn}
                    isLoading={isFetching}
                />
            </CrudLayout>
        </TableContext.Provider>
    );
};

export default CrudModule;
