import { useTitle } from "@/hooks/useTitle";
import TabsContent from "@/components/TabsContent";
import { config } from "./config";

const ProfileSettings = () => {
    useTitle("Settings");

    return <TabsContent content={config} />;
};

export default ProfileSettings;
