import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const links = [
        { label: "Home", path: "/admin" },
        { label: "Items", path: "/admin/items" },
        { label: "Orders", path: "/admin/orders" },
    ];

    const location = useLocation();

    const renderedLinks = links.map((link) => {
        const isActive = location.pathname === link.path;
        const activeClass = isActive
            ? "font-bold border-l-4 border-blue-500 pl-1 md:bg-gray-100"
            : "";

        return (
            <Link
                key={link.label}
                to={link.path}
                className={`py-2 w-1/2 ${activeClass}`}
            >
                {link.label}
            </Link>
        );
    });

    return <nav className="flex flex-col w-1/6">{renderedLinks}</nav>;
};

export default Sidebar;
