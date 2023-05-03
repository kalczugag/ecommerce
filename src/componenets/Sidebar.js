import { Link } from "react-router-dom";

const Sidebar = () => {
    const links = [
        { label: "Items", path: "items" },
        { label: "Orders", path: "orders" },
    ];

    const renderedLinks = links.map((link) => {
        return (
            <Link key={link.label} to={link.path}>
                {link.label}
            </Link>
        );
    });

    return <nav className="flex flex-col space-y-2">{renderedLinks}</nav>;
};

export default Sidebar;
