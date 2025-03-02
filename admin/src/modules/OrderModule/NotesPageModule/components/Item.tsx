import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { IconButton } from "@mui/material";
import { DragIndicator, EditNote, Clear } from "@mui/icons-material";
import type { OrderNote } from "@/types/Order";

interface ItemProps {
    item: OrderNote;
    index: number;
    column: string;
}

const Item = ({ item, index, column }: ItemProps) => {
    const [isHover, setIsHover] = useState(false);
    const { ref, handleRef, isDragging } = useSortable({
        id: item._id,
        index,
        type: `${column}_note`,
        accept: `${column}_note`,
        group: column,
    });

    return (
        <div
            ref={ref}
            data-dragging={isDragging}
            onClick={() => console.log(item)}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="Item flex flex-row items-center justify-between space-x-2 p-3 rounded-md w-full bg-light-primary dark:bg-dark-primary"
        >
            <p className="text-sm select-none">{item.text}</p>
            <span className="flex">
                <IconButton
                    size="small"
                    style={{ visibility: isHover ? "visible" : "hidden" }}
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
    );
};

export default Item;
