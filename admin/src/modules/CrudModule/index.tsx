import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table";
import TableContext from "@/contexts/TableContext";
import useDebounce from "@/hooks/useDebounce";
import { normalizeValues } from "@/utils/helpers";
import CrudLayout from "@/layouts/CrudLayout";
import Table, { type EnhancedTableProps } from "@/components/Table2";
import { Checkbox } from "@mui/material";
import TableFilters from "@/components/Table2/components/TableFilters";

export interface CrudModuleProps<T>
    extends Partial<Omit<EnhancedTableProps<T>, "isLoading">> {
    actionForm?: ReactNode;
    withTable?: boolean;
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
    withTable = true,
}: CrudModuleProps<T>) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilters] = useState<any>([]);

    const [trigger, result] = queryFn?.() || [];
    const { data, isFetching } = result || {};

    const queryArgs = useMemo(() => {
        if (!withTable) return null;

        return {
            skip: pagination.pageIndex,
            limit: pagination.pageSize,
            sort: sorting.map(
                (s) => `${s.desc ? "-" : ""}${s.id.toLowerCase()}`
            ),
            filter: globalFilter,
        };
    }, [
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
        globalFilter,
        withTable,
    ]);

    useEffect(() => {
        if (withTable && trigger && queryArgs) trigger(queryArgs, true);
    }, [queryArgs]);

    const extendedColumns = useMemo<ColumnDef<T, any>[]>(() => {
        if (!columns) return [];
        return [createSelectColumn<T>(), ...columns];
    }, [columns]);

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
        if (withTable) setGlobalFilters(normalizeValues(values));
    }, 300);

    const hasTable = withTable && table && columns && queryFn;
    const headerContent = hasTable ? (
        <TableFilters onSubmit={handleSubmit}>{actionForm}</TableFilters>
    ) : (
        <>{actionForm}</>
    );

    return (
        <TableContext.Provider value={table}>
            <CrudLayout headerPanel={headerContent}>
                {hasTable && (
                    <Table
                        columns={columns}
                        queryFn={queryFn}
                        isLoading={isFetching}
                    />
                )}
            </CrudLayout>
        </TableContext.Provider>
    );
};

export default CrudModule;
