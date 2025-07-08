import { Delete, FilterList } from "@mui/icons-material";
import { Icon, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Table } from "@tanstack/react-table";

interface EnhancedTableToolbarProps {
    table: Table<any>;
}

const EnhancedTableToolbar = ({ table }: EnhancedTableToolbarProps) => {
    const numSelected = table.getSelectedRowModel().rows.length;

    return (
        <>
            {numSelected > 0 ? (
                <Toolbar
                    variant="dense"
                    sx={{
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            ) : null}
        </>
    );
};

export default EnhancedTableToolbar;
