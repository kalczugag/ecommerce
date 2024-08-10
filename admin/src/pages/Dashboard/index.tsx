import { useTitle } from "@/hooks/useTitle";
import DefaultLayout from "@/layouts/DefaultLayout";

const Dashboard = () => {
    useTitle("Admin Dashboard");

    return <DefaultLayout>Dashboard</DefaultLayout>;
};

export default Dashboard;
