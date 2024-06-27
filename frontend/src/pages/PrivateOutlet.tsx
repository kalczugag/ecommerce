import { Outlet } from "react-router-dom";
import Layout from "../layouts/Layout";

const PrivateOutlet = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default PrivateOutlet;
