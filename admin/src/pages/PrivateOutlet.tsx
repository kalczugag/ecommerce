import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/store";
import NavigationLayout from "@/layouts/NavigationLayout";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return token ? (
        <NavigationLayout>
            <Outlet />
        </NavigationLayout>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default RequireAuth;
