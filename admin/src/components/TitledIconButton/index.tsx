import { Link } from "react-router-dom";

interface TitledIconButtonProps {
    title: string;
    to: string;
    icon?: JSX.Element;
    handleClick?: () => void;
}

const TitledIconButton = ({
    title,
    to,
    icon,
    handleClick,
}: TitledIconButtonProps) => {
    return (
        <Link
            to={to}
            className="flex flex-row space-x-4 py-2 px-6 truncate w-full rounded hover:bg-lighter dark:hover:bg-dark-primary"
            onClick={handleClick}
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
};

export default TitledIconButton;
