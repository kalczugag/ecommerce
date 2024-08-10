import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationLayout from "@/layouts/NavigationLayout";
import { useAppSelector } from "@/hooks/useStore";
import { useEffect } from "react";

const PrivateOutlet = () => {
    const { token } = useAppSelector((state) => state.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && pathname !== "/login") navigate("/login");
    }, [token]);

    return (
        <NavigationLayout>
            <Outlet />
        </NavigationLayout>
    );
};

export default PrivateOutlet;
