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
            className="flex flex-row space-x-4 py-2 truncate hover:bg-gray-200"
            onClick={handleClick}
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
};

export default TitledIconButton;
