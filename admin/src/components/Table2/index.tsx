import { useTableContext } from "@/contexts/TableContext";
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
} from "@mui/material";
import { ColumnDef, flexRender } from "@tanstack/react-table";

export interface EnhancedTableProps<T> {
    columns: ColumnDef<T, any>[];
    queryFn: LazyGetTriggerType<T, any>;
    isLoading: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#EBEDF1",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const EnhancedTable = <T extends object>({
    isLoading,
}: Partial<EnhancedTableProps<T>>) => {
    const table = useTableContext<T>();

    const { pagination } = table.getState();
    const { rowCount } = table.options;

    return (
        <>
            <TableContainer sx={{ maxHeight: "calc(100vh - 340px)" }}>
                <Table stickyHeader size="small">
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
                                            direction={
                                                header.column.getIsSorted() ===
                                                "asc"
                                                    ? "asc"
                                                    : "desc"
                                            }
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
                {isLoading && (
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
                    count={rowCount || 0}
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
