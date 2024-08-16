import { useEffect } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
} from "@mui/icons-material";
import Loading from "../Loading";
import { setPagination, reset } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import type { TableColumnProps } from "@/modules/CrudModule";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    wordBreak: "normal",
    overflowWrap: "normal",
    [`&.${tableCellClasses.head}`]: {
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
};

interface CustomPaginationActionsTableProps {
    headerOptions: TableColumnProps[];
    rowData: any[];
    totalItems?: number;
    isLoading: boolean;
}

const CustomPaginationActionsTable = ({
    headerOptions,
    rowData,
    totalItems = rowData.length,
    isLoading,
}: CustomPaginationActionsTableProps) => {
    const dispatch = useAppDispatch();
    const { page, pageSize } = useAppSelector((state) => state.table);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        dispatch(setPagination({ page: newPage }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(
            setPagination({
                page: 0,
                pageSize: parseInt(event.target.value, 10),
            })
        );
    };

    useEffect(() => {
        dispatch(reset());
    }, []);

    return (
        <Loading isLoading={isLoading}>
            <TableContainer
                component={Paper}
                className="text-text-light dark:text-text-dark"
            >
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            {headerOptions.map(({ label }, index) => {
                                if (index <= 1) {
                                    return (
                                        <StyledTableCell key={index}>
                                            {label}
                                        </StyledTableCell>
                                    );
                                }

                                return (
                                    <StyledTableCell align="right" key={index}>
                                        {label}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.length === 0 && !isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={headerOptions.length}
                                    align="center"
                                    sx={{ fontSize: "24px" }}
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            (pageSize > 0
                                ? rowData.slice(0, pageSize)
                                : rowData
                            ).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {headerOptions.map(
                                        ({ render }, colIndex) => (
                                            <TableCell
                                                key={colIndex}
                                                align={
                                                    colIndex > 1
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                {render(row)}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: -1 },
                                ]}
                                colSpan={headerOptions.length + 1}
                                count={totalItems}
                                rowsPerPage={pageSize}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            "aria-label": "rows per page",
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Loading>
    );
};

export default CustomPaginationActionsTable;
