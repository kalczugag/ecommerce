import { useTitle } from "@/hooks/useTitle";
import DashboardModule from "@/modules/DashboardModule";

const Dashboard = () => {
    useTitle("Dashboard - Admin");

    return <DashboardModule />;
};

export default Dashboard;
