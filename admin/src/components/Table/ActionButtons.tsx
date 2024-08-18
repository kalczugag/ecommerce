import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AlertDialog from "../AlertDialog";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number | string;
    disabled?: boolean;
    handleDelete?: () => void;
}

const ActionButtons = ({ id, disabled, handleDelete }: Props) => {
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
            <IconButton
                onClick={() => handleNavigate(id.toString())}
                aria-label="edit"
                sx={{ padding: 0 }}
                disabled={disabled}
            >
                <Edit />
            </IconButton>
            <AlertDialog
                title="Are you sure?"
                content="You won't be able to revert this!"
                cancel="Cancel"
                confirm="Yes"
                onConfirm={onDeleteClick}
            >
                {(props) => (
                    <IconButton
                        onClick={props.open}
                        aria-label="delete"
                        sx={{ padding: 0 }}
                        disabled={disabled}
                    >
                        <Delete />
                    </IconButton>
                )}
            </AlertDialog>
        </div>
    );
};

export default ActionButtons;
