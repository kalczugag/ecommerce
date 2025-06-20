import { LazyGetTriggerType } from "@/types/global";
import {
    Box,
    LinearProgress,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    tableCellClasses,
    tableRowClasses,
    Checkbox,
} from "@mui/material";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export interface EnhancedTableProps<T> {
    columns: ColumnDef<T, any>[];
    queryFn: LazyGetTriggerType<T, any>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
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
    size: 48,
    minSize: 32,
    maxSize: 64,
});

const EnhancedTable = <T extends object>({
    columns,
    queryFn,
}: EnhancedTableProps<T>) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const [trigger, { data, isFetching }] = queryFn();

    useEffect(() => {
        trigger(
            {
                skip: pagination.pageIndex,
                limit: pagination.pageSize,
            },
            true
        );
    }, [pagination.pageIndex, pagination.pageSize]);

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
        },
        debugTable: true,
        enableRowSelection: true,
        manualPagination: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <StyledTableCell
                                    size="small"
                                    variant="head"
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            selected={row.getIsSelected()}
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
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
};

export default EnhancedTable;
