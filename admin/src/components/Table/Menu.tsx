import { useState } from "react";
import { MoreVert, Delete, Edit, Info, Visibility } from "@mui/icons-material";
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import AlertDialog from "../AlertDialog";
import { useNavigate } from "react-router-dom";

interface TableMenuProps {
    id: string;
    handleView?: () => void;
    handleDelete?: () => void;
}

const TableMenu = ({ id, handleView, handleDelete }: TableMenuProps) => {
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
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {handleView && (
                    <MenuItem onClick={handleView}>
                        <ListItemIcon>
                            <Visibility fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View</ListItemText>
                    </MenuItem>
                )}

                <MenuItem onClick={() => handleNavigate(id.toString())}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                {handleDelete && (
                    <AlertDialog
                        title="Are you sure?"
                        content="You won't be able to revert this!"
                        cancel="Cancel"
                        confirm="Yes"
                        onConfirm={() => {
                            setAnchorEl(null);
                            handleDelete();
                        }}
                    >
                        {(props) => (
                            <MenuItem onClick={props.open}>
                                <ListItemIcon>
                                    <Delete fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        )}
                    </AlertDialog>
                )}
            </Menu>
        </div>
    );
};

export default TableMenu;
