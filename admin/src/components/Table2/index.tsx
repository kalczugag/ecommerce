import {
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

interface EnhancedTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    rowCount: number;
}

const EnhancedTable = <T extends object>({
    data,
    columns,
    rowCount,
}: EnhancedTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        rowCount,
        debugTable: true,
        enableRowSelection: true,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    const { pageIndex, pageSize } = table.getState().pagination;

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
                            {headerGroup.headers.map((header) => (
                                <TableCell
                                    align="center"
                                    variant="head"
                                    key={header.id}
                                >
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
                                    align="center"
                                    variant="body"
                                    key={cell.id}
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
            <TablePagination
                component="div"
                count={table.getFilteredRowModel().rows.length}
                page={pageIndex}
                rowsPerPage={pageSize}
                onPageChange={(_, newPage) => table.setPageIndex(newPage)}
                onRowsPerPageChange={(event) => {
                    const size = parseInt(event.target.value, 10);
                    table.setPageSize(size);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
    );
};

export default EnhancedTable;
