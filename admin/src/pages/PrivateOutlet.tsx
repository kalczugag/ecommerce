import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, useRefreshTokenQuery } from "@/store";
import NavigationLayout from "@/layouts/NavigationLayout";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const RequireAuth = () => {
    useRefreshTokenQuery();

    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            setIsLoading(false);
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
