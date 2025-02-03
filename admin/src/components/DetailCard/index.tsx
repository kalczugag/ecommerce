import { HTMLAttributes, ReactNode, useState } from "react";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

interface DetailCardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "standard" | "accordion";
    defaultExpanded?: boolean;
    label: string;
    children: ReactNode;
}

const DetailCard = ({
    variant = "standard",
    label,
    defaultExpanded = false,
    children,
    className,
}: DetailCardProps) => {
    const [_, setSearchParams] = useSearchParams();
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleClick = () => {
        if (!expanded) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("page", "0");
                newParams.set("pageSize", "5");
                return newParams;
            });
        }

        setExpanded(!expanded);
    };

    return (
        <div className={`flex flex-col space-y-4 ${className}`}>
            {variant === "standard" && (
                <h3 className="text-lg bg-gray-200 p-3">{label}</h3>
            )}
            {variant === "accordion" ? (
                <>
                    <button
                        className="flex justify-between items-center text-lg bg-gray-200 p-3"
                        onClick={handleClick}
                    >
                        {label}
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </button>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {children}
                    </Collapse>
                </>
            ) : (
                children
            )}
        </div>
    );
};

export default DetailCard;
