import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRefreshTokenQuery, useLogoutMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import NavigationLayout from "@/layouts/NavigationLayout";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const RequireAuth = () => {
    const { token, isAdmin } = useAuth();
    const location = useLocation();

    const [logout] = useLogoutMutation();
    const { isLoading } = useRefreshTokenQuery(undefined, {
        skip:
            !!token ||
            location.pathname === "/login" ||
            location.pathname === "/register",
    });

    useEffect(() => {
        if (token) {
            if (isAdmin) {
                enqueueSnackbar("Logged in successfully", {
                    variant: "success",
                });
            } else {
                enqueueSnackbar("You are not an admin", { variant: "error" });
                logout();
            }
        }
    }, [token, isAdmin]);

    if (isLoading) {
        return <LoadingBackdrop isLoading={isLoading} />;
    }

    return token && isAdmin ? (
        <NavigationLayout>
            <Outlet />
        </NavigationLayout>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default RequireAuth;
