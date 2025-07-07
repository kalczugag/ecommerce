import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import {
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    styled,
} from "@mui/material";
import AlertDialog from "../../AlertDialog";

interface TableActionsProps {
    id: string;
    handleDelete: (id: string) => void;
}

const CompactMenuItem = styled(MenuItem)({
    my: 0,
    py: 0,
});

const TableActions = ({ id, handleDelete }: TableActionsProps) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (to: string) => {
        navigate(to);
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    dense: true,
                }}
            >
                <CompactMenuItem onClick={() => handleNavigate(id.toString())}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </CompactMenuItem>
                <Divider component="li" />
                <AlertDialog
                    title="Are you sure?"
                    content="You won't be able to revert this!"
                    cancel="Cancel"
                    confirm="Yes"
                    onConfirm={() => {
                        setAnchorEl(null);
                        handleDelete(id);
                    }}
                >
                    {(props) => (
                        <CompactMenuItem
                            onClick={props.open}
                            sx={{ color: "error.main" }}
                        >
                            <ListItemIcon>
                                <Delete fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </CompactMenuItem>
                    )}
                </AlertDialog>
            </Menu>
        </div>
    );
};

export default TableActions;
