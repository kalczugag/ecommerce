import useSidebar from "@/hooks/useSidebar";
import TabsContent from "@/components/TabsContent";
import GeneralSettingsModule from "@/modules/SettingsModule/GeneralSettingsModule";
import type { Content } from "@/types/Content";
import { config } from "./config";

const Settings = () => {
    useSidebar(config);

    const content: Content[] = [
        {
            key: "general_settings",
            label: "General Settings",
            children: <GeneralSettingsModule />,
        },
    ];

    return <TabsContent content={content} />;
};

export default Settings;
