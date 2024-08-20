import { IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import AlertDialog from "../AlertDialog";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number | string;
    disabled?: boolean;
    info?: boolean;
    handleDelete?: () => void;
}

const ActionButtons = ({ id, disabled, info, handleDelete }: Props) => {
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
            <Tooltip title={info ? "Info" : "Edit"}>
                <IconButton
                    onClick={() => handleNavigate(id.toString())}
                    aria-label="edit"
                    sx={{ padding: 0 }}
                    disabled={disabled}
                >
                    {info ? <Info /> : <Edit />}
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
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    )}
                </AlertDialog>
            )}
        </div>
    );
};

export default ActionButtons;
