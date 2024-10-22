import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, useRefreshTokenQuery } from "@/store";
import { enqueueSnackbar } from "notistack";
import NavigationLayout from "@/layouts/NavigationLayout";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const { isLoading } = useRefreshTokenQuery(undefined, {
        skip:
            !!token ||
            location.pathname === "/login" ||
            location.pathname === "/register",
    });

    useEffect(() => {
        if (token) {
            enqueueSnackbar("Logged in successfully", { variant: "success" });
        }
    }, [token]);

    if (isLoading) {
        return <LoadingBackdrop isLoading={isLoading} />;
    }

    return token ? (
        <NavigationLayout>
            <Outlet />
        </NavigationLayout>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default RequireAuth;
