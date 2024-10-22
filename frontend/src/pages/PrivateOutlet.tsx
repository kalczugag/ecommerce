import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRefreshTokenQuery, useUpdateVisitorCountMutation } from "@/store";
import Layout from "@/layouts/Layout";
import useAuth from "@/hooks/useAuth";
import { useSnackbar } from "notistack";

const PrivateOutlet = () => {
    const { token } = useAuth();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

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

    useEffect(() => {
        if (token) {
            enqueueSnackbar("Logged in successfully", { variant: "success" });
        }
    }, [token]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default PrivateOutlet;
