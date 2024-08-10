import { Outlet, useNavigate } from "react-router-dom";
import NavigationLayout from "@/layouts/NavigationLayout";
import { useAppSelector } from "@/hooks/useStore";
import { useEffect } from "react";

const PrivateOutlet = () => {
    const { token } = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/login");
    }, []);

    return (
        <NavigationLayout>
            <Outlet />
        </NavigationLayout>
    );
};

export default PrivateOutlet;
