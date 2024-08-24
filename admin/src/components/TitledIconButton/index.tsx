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
            className={`flex flex-row space-x-4 py-2 px-6 truncate w-full rounded hover:bg-dark-primary ${
                active && "bg-dark-primary hover:bg-hover-dark"
            }`}
            onClick={handleClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};

export default TitledIconButton;
