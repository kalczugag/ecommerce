import { Outlet } from "react-router-dom";
import Sidebar from "../componenets/Sidebar";

export const config = [
    {
        label: "Item",
        render: (item) => item.title,
    },
    {
        label: "Description",
        render: (item) => item.description,
    },
    {
        label: "Price",
        render: (item) => `$${item.price}`,
        sortValue: (item) => item.price,
    },
    {
        label: "Image (T or F)",
        render: (item) => (item.image ? "T" : "F"),
        sortValue: (item) => (item.image ? "T" : "F"),
    },
];

const Admin = () => {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Admin;
