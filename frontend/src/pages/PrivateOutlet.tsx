import { Outlet } from "react-router-dom";

const PrivateOutlet = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateOutlet;
