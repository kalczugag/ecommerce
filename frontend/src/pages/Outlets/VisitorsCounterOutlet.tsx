import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUpdateVisitorCountMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import Layout from "@/layouts/Layout";

const VisitorsCounterOutlet = () => {
    const { token } = useAuth();

    const [updateView] = useUpdateVisitorCountMutation();

    useEffect(() => {
        updateView({ isLoggedIn: !!token });
    }, []);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default VisitorsCounterOutlet;
