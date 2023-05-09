import { Outlet } from "react-router-dom";
import Sidebar from "../componenets/Sidebar";

const Admin = () => {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Admin;
