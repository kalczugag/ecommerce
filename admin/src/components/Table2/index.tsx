import type { LazyGetTriggerType } from "@/types/global";
import {
    Box,
    LinearProgress,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableSortLabel,
    TablePagination,
    TableRow,
    tableCellClasses,
    Checkbox,
} from "@mui/material";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export interface EnhancedTableProps<T> {
    columns: ColumnDef<T, any>[];
    queryFn: LazyGetTriggerType<T, any>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#EBEDF1",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

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

const EnhancedTable = <T extends object>({
    columns,
    queryFn,
}: EnhancedTableProps<T>) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState<SortingState>([]);

    const [trigger, { data, isFetching }] = queryFn();

    useEffect(() => {
        trigger(
            {
                skip: pagination.pageIndex,
                limit: pagination.pageSize,
                sort: sorting.map(
                    (s) => `${s.desc ? "-" : ""}${s.id.toLowerCase()}`
                ),
            },
            true
        );
    }, [pagination.pageIndex, pagination.pageSize, sorting]);

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
        },
        debugTable: true,
        enableRowSelection: true,
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
                <Table stickyHeader>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <StyledTableCell
                                        size="small"
                                        variant="head"
                                        key={header.id}
                                    >
                                        <TableSortLabel
                                            active={Boolean(
                                                header.column.getIsSorted()
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                selected={row.getIsSelected()}
                                tabIndex={-1}
                                hover
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <StyledTableCell
                                        variant="body"
                                        key={cell.id}
                                        sx={{
                                            width: "auto",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box position="relative">
                {isFetching && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                        }}
                    />
                )}
                <TablePagination
                    component="div"
                    count={data?.count || 0}
                    page={pagination.pageIndex}
                    rowsPerPage={pagination.pageSize}
                    onPageChange={(_, newPage) => table.setPageIndex(newPage)}
                    onRowsPerPageChange={(event) => {
                        const size = parseInt(event.target.value, 10);
                        table.setPageSize(size);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    showFirstButton
                    showLastButton
                />
            </Box>
        </>
    );
};

export default EnhancedTable;
