import { Link, useLocation } from "react-router-dom";
import { MoveToInbox, Email, Adb } from "@mui/icons-material";
import TitledIconButton from "../TitledIconButton";

const dashboardItems = [
    { title: "Dashboard", to: "/", icon: <MoveToInbox /> },
    { title: "Products", to: "/products", icon: <Email /> },
    { title: "Customers", to: "/customers", icon: <MoveToInbox /> },
    { title: "Orders", to: "/orders", icon: <Email /> },
    { title: "Total Earnings", to: "/earnings", icon: <MoveToInbox /> },
    { title: "Weekly Overview", to: "/overview?weekly", icon: <Email /> },
    {
        title: "Monthly Overview",
        to: "/overview?monthly",
        icon: <MoveToInbox />,
    },
    { title: "Add Product", to: "/products/add", icon: <Email /> },
];

const settingsItems = [
    { title: "General", to: "/settings" },
    { title: "Account", to: "/settings/account" },
];
const Sidebar = () => {
    const { pathname } = useLocation();

    const itemsToRender = pathname.startsWith("/settings")
        ? settingsItems
        : dashboardItems;

    return (
        <div className="hidden flex-col py-6 h-screen bg-light-secondary w-[215.156px] dark:bg-darker md:flex">
            <div className="flex items-center px-6 mb-10">
                <Adb className="mr-1" />
                <Link
                    to="/"
                    className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                >
                    LOGO
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                {itemsToRender.map((item, index) => (
                    <TitledIconButton
                        key={item.title + "_" + index.toString()}
                        {...item}
                        active={pathname === item.to}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
