import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, useRefreshTokenQuery } from "@/store";
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
