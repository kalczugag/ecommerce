import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../componenets/Sidebar";

const Admin = () => {
    const newOrders = useSelector((state) => state.orders.newOrders);
    const location = useLocation();

    const shouldShowNewOrders =
        !location.pathname || location.pathname === "/admin";

    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
            {shouldShowNewOrders && (
                <div className="text-2xl">newOrders: {newOrders}</div>
            )}
        </div>
    );
};

export default Admin;
