import { useTitle } from "@/hooks/useTitle";
import DashboardModule from "@/modules/DashboardModule";

const Dashboard = () => {
    useTitle("Everwear | Clothing & Footwear for Every Style");

    return <DashboardModule />;
};

export default Dashboard;
