import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const PrivateOutlet = () => {
    const { token } = useAuth();
    const location = useLocation();

    const isAuthLocation =
        location.pathname === "/login" || location.pathname === "/register";

    useEffect(() => {
        if (!token)
            enqueueSnackbar("Please login first", { variant: "warning" });
    }, []);

    return token ? (
        <Outlet />
    ) : token && isAuthLocation ? (
        <Navigate to="/" replace />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateOutlet;
