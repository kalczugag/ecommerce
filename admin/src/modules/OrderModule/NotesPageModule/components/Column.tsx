import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import Loading from "@/components/Loading";

interface ColumnProps {
    children: ReactNode;
    column: string;
    isLoading: boolean;
}

const Column = ({ column, children, isLoading }: ColumnProps) => {
    const { isDropTarget, ref } = useDroppable({
        id: column,
        type: "column",
        accept: `${column}_note`,
        collisionPriority: CollisionPriority.Low,
    });
    const style = isDropTarget ? { background: "#00000030" } : undefined;

    return (
        <Loading isLoading={isLoading}>
            <div className="Column" ref={ref} style={style}>
                {children}
            </div>
        </Loading>
    );
};

export default Column;
