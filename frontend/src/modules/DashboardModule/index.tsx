import useAuth from "@/hooks/useAuth";
import CampaignsList from "./components/CampaignsList";

const DashboardModule = () => {
    const { token } = useAuth();

    return (
        <div className="my-8">
            <CampaignsList isToken={Boolean(token)} />
            {/* <div className="flex flex-row space-x-4 items-center justify-center">
                <Skeleton variant="rectangular" height={150} width={300} />
                <Skeleton variant="rectangular" height={150} width={300} />
                <Skeleton variant="rectangular" height={150} width={300} />
                <Skeleton variant="rectangular" height={150} width={300} />
            </div> */}
        </div>
    );
};

export default DashboardModule;
