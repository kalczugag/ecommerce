import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUpdateVisitorCountMutation } from "@/store/apis/summaryApi";
import Layout from "@/layouts/Layout";

const PrivateOutlet = () => {
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
