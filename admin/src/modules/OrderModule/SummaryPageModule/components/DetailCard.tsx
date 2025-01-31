import { ReactNode, useState } from "react";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface DetailCardProps {
    variant?: "standard" | "accordion";
    index?: number;
    label: string;
    children: ReactNode;
}

const DetailCard = ({
    variant = "standard",
    label,
    index,
    children,
}: DetailCardProps) => {
    const [expanded, setExpanded] = useState(index === 0 ? true : false);

    return (
        <div className="flex flex-col space-y-4">
            {variant === "standard" && (
                <h3 className="text-lg bg-gray-200 p-3">{label}</h3>
            )}
            {variant === "accordion" ? (
                <>
                    <button
                        className="flex justify-between items-center text-lg bg-gray-200 p-3"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {label}
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </button>
                    <Collapse in={expanded}>{children}</Collapse>
                </>
            ) : (
                children
            )}
        </div>
    );
};

export default DetailCard;
