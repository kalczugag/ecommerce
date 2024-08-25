import { Link } from "react-router-dom";
import type { SidebarContent } from "@/types/Content";

const TitledIconButton = ({
    label,
    to,
    icon,
    active,
    handleClick,
}: SidebarContent) => {
    return (
        <Link
            to={to}
            data-testid="sidebar-item"
            className={`flex flex-row space-x-4 py-2 px-6 truncate w-full rounded hover:bg-hover-light-primary ${
                active && "bg-hover-light-primary hover:bg-text-light"
            }`}
            onClick={handleClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};

export default TitledIconButton;
