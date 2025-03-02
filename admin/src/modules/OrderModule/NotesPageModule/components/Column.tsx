import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import Loading from "@/components/Loading";
import { Button, IconButton } from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";

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
            <div
                className=" flex flex-col bg-[#F1F2F4] p-2 rounded-xl shadow space-y-4 min-w-44 dark:bg-darker"
                ref={ref}
                style={style}
            >
                <div className="flex items-center justify-between px-2 pt-2">
                    <h3 className="font-semibold">{column}</h3>
                    <IconButton size="small">
                        <MoreHoriz fontSize="small" />
                    </IconButton>
                </div>
                <div className="flex flex-col items-start space-y-2">
                    {children}
                </div>
                <Button
                    color="inherit"
                    startIcon={<Add />}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderRadius: "6px",
                    }}
                >
                    Add Note
                </Button>
            </div>
        </Loading>
    );
};

export default Column;
