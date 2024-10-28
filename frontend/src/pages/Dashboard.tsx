import { useTitle } from "@/hooks/useTitle";
import DashboardModule from "@/modules/DashboardModule";

const Dashboard = () => {
    useTitle("Ecommerce");

    return <DashboardModule />;
};

export default Dashboard;
