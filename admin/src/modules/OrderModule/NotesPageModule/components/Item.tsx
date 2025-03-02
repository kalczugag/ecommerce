import { useState } from "react";
import { useDeleteNoteMutation } from "@/store";
import { useSortable } from "@dnd-kit/react/sortable";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { IconButton } from "@mui/material";
import { DragIndicator, Clear } from "@mui/icons-material";
import type { OrderNote } from "@/types/Order";
import EditItemDialog from "./EditItemDialog";

interface ItemProps {
    item: OrderNote;
    index: number;
    column: string;
}

const Item = ({ item, index, column }: ItemProps) => {
    const [isHover, setIsHover] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const { handleMutation } = useHandleMutation();
    const { ref, handleRef, isDragging } = useSortable({
        id: item._id,
        index,
        type: `${column}_note`,
        accept: `${column}_note`,
        group: column,
    });

    const [deleteNote, { isLoading }] = useDeleteNoteMutation();

    const handleDelete = () => {
        handleMutation({
            mutation: deleteNote,
            values: item._id,
            snackbar: false,
        });
    };

    const handleOpen = () => setIsOpenDialog(true);
    const handleClose = () => setIsOpenDialog(false);

    return (
        <>
            <div
                ref={ref}
                data-dragging={isDragging}
                onClick={handleOpen}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="Item flex flex-row items-center justify-between space-x-2 p-3 rounded-md w-full bg-light-primary dark:bg-dark-primary"
            >
                <p className="text-sm select-none">{item.text}</p>
                <span className="flex">
                    <IconButton
                        size="small"
                        style={{ visibility: isHover ? "visible" : "hidden" }}
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        <Clear fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ cursor: "grab" }}
                        ref={handleRef}
                    >
                        <DragIndicator fontSize="small" />
                    </IconButton>
                </span>
            </div>
            <EditItemDialog
                isOpen={isOpenDialog}
                handleClose={handleClose}
                data={item}
            />
        </>
    );
};

export default Item;
