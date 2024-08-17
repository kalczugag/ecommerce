import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
            <IconButton
                onClick={onDeleteClick}
                aria-label="delete"
                sx={{ padding: 0 }}
                disabled={disabled}
            >
                <Delete />
            </IconButton>
        </div>
    );
};

export default ActionButtons;
