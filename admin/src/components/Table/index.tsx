import { useState } from "react";
import { useTheme, styled, alpha } from "@mui/material/styles";
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
    Checkbox,
    Typography,
    Toolbar,
    Tooltip,
} from "@mui/material";
import {
    Delete,
    FilterList,
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
} from "@mui/icons-material";
import Loading from "../Loading";
import type { TableColumnProps } from "@/modules/CrudModule";
import usePagination from "@/hooks/usePagination";

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

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme: any) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                },
            ]}
        >
            {numSelected > 0 && (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            )}
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

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
    const [{ skip, limit }, setPagination] = usePagination();
    const [selected, setSelected] = useState<readonly number[]>([]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPagination({ skip: newPage });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPagination({
            skip: 0,
            limit: parseInt(event.target.value, 10),
        });
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = rowData.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    return (
        <Loading isLoading={isLoading}>
            <TableContainer
                component={Paper}
                sx={{ bgcolor: "#F5F6FA" }}
                className="text-text-light dark:text-text-dark"
            >
                <Table>
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
                            (limit > 0 ? rowData.slice(0, limit) : rowData).map(
                                (row, rowIndex) => (
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
                                )
                            )
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
                                rowsPerPage={limit}
                                page={!totalItems || totalItems <= 0 ? 0 : skip}
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
