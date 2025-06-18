import { LazyGetTriggerType } from "@/types/global";
import {
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface EnhancedTableProps<T> {
    columns: ColumnDef<T, any>[];
    queryFn: LazyGetTriggerType<T, any>;
}

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
                populate: "_role",
            },
            true
        );
    }, [pagination.pageIndex, pagination.pageSize]);

    const table = useReactTable({
        data: data?.result || [],
        columns,
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
                    {/* <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={table.getIsSomeRowsSelected()}
                        />
                    </TableCell> */}
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <TableCell variant="head" key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} selected={row.getIsSelected()}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
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
                                </TableCell>
                            ))}
                        </TableRow>
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
