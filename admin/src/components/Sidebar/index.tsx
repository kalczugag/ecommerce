import { MoveToInbox, Email, Adb, Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import TitledIconButton from "../TitledIconButton";
import { useState } from "react";
import SettingsModal from "../../containers/modals/SettingsModal";

const items = [
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

const Sidebar = () => {
    return (
        <div className="flex flex-col py-6 h-screen bg-light-secondary dark:bg-[#171717]">
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
                {items.map((item, index) => (
                    <TitledIconButton
                        key={item.title + "_" + index.toString()}
                        {...item}
                    />
                ))}
            </div>
            <SettingsModal />
        </div>
    );
};

export default Sidebar;
