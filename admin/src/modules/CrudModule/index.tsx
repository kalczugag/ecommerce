import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table";
import TableContext, { useTableContext } from "@/contexts/TableContext";
import useDebounce from "@/hooks/useDebounce";
import { normalizeValues } from "@/utils/helpers";
import CrudLayout from "@/layouts/CrudLayout";
import Table, { type EnhancedTableProps } from "@/components/Table2";
import { Checkbox } from "@mui/material";
import TableFilters from "@/components/Table2/components/TableFilters";

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

    const queryArgs = useMemo(
        () => ({
            skip: pagination.pageIndex,
            limit: pagination.pageSize,
            sort: sorting.map(
                (s) => `${s.desc ? "-" : ""}${s.id.toLowerCase()}`
            ),
            filter: globalFilter,
        }),
        [pagination.pageIndex, pagination.pageSize, sorting, globalFilter]
    );

    useEffect(() => {
        trigger(queryArgs, true);
    }, [queryArgs]);

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

    console.log(data);

    const handleSubmit = useDebounce((values: any) => {
        setGlobalFilters(normalizeValues(values));
    }, 300);

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
