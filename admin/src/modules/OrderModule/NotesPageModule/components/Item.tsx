import { useSortable } from "@dnd-kit/react/sortable";
import type { OrderNote } from "@/types/Order";

interface ItemProps {
    item: OrderNote;
    index: number;
    column: string;
}

const Item = ({ item, index, column }: ItemProps) => {
    const { ref, isDragging } = useSortable({
        id: item._id,
        index,
        type: `${column}_note`,
        accept: `${column}_note`,
        group: column,
    });

    return (
        <button className="Item" ref={ref} data-dragging={isDragging}>
            {item.text}
        </button>
    );
};

export default Item;
