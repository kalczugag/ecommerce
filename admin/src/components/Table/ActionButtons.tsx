import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import AlertDialog from "../AlertDialog";

interface Props {
    id: number | string;
    component?: "button" | "iconButton";
    disabled?: boolean;
    info?: boolean;
    element?: ReactNode;
    handleDelete?: () => void;
}

const ActionButtons = ({
    id,
    component = "iconButton",
    disabled,
    info,
    element,
    handleDelete,
}: Props) => {
    const navigate = useNavigate();

    const handleNavigate = (to: string) => {
        navigate(to);
    };

    const onDeleteClick = () => {
        if (handleDelete) {
            handleDelete();
        }
    };

    return (
        <div className="flex flex-row items-center justify-end space-x-2">
            {component === "button" ? (
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleNavigate(id.toString())}
                    className="truncate"
                >
                    {element ? element : ""}
                </Button>
            ) : (
                <>
                    <Tooltip title={info ? "Info" : "Edit"}>
                        <IconButton
                            onClick={() => handleNavigate(id.toString())}
                            aria-label="edit"
                            sx={{ padding: 0 }}
                            disabled={disabled}
                        >
                            {info && !element ? (
                                <Info />
                            ) : element ? (
                                element
                            ) : (
                                <Edit />
                            )}
                        </IconButton>
                    </Tooltip>
                    {handleDelete && (
                        <AlertDialog
                            title="Are you sure?"
                            content="You won't be able to revert this!"
                            cancel="Cancel"
                            confirm="Yes"
                            onConfirm={onDeleteClick}
                        >
                            {(props) => (
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={props.open}
                                        aria-label="delete"
                                        sx={{ padding: 0 }}
                                        disabled={disabled}
                                    >
                                        {element ? element : <Delete />}
                                    </IconButton>
                                </Tooltip>
                            )}
                        </AlertDialog>
                    )}
                </>
            )}
        </div>
    );
};

export default ActionButtons;
