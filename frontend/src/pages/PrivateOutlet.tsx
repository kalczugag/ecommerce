import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRefreshTokenQuery, useUpdateVisitorCountMutation } from "@/store";
import Layout from "@/layouts/Layout";
import useAuth from "@/hooks/useAuth";

const PrivateOutlet = () => {
    const { token } = useAuth();
    const location = useLocation();

    useRefreshTokenQuery(undefined, {
        skip:
            !!token ||
            location.pathname === "/login" ||
            location.pathname === "/register",
    });

    const [updateView] = useUpdateVisitorCountMutation();

    useEffect(() => {
        updateView({});
    }, []);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default PrivateOutlet;
