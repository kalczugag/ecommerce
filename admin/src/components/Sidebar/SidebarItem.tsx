import { Link } from "react-router-dom";

interface SidebarItemProps {
    props: {
        title: string;
        to: string;
        icon: JSX.Element;
    };
}

const SidebarItem = ({ props }: SidebarItemProps) => {
    const { title, to, icon } = props;

    return (
        <Link to={to} className="flex flex-row space-x-4">
            {icon}
            <span>{title}</span>
        </Link>
    );
};

export default SidebarItem;
