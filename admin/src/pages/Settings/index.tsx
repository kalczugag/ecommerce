import { useTitle } from "@/hooks/useTitle";
import TabsContent from "@/components/TabsContent";
import GeneralSettingsModule from "@/modules/SettingsModule/GeneralSettingsModule";
import type { Content } from "@/types/Content";

const Settings = () => {
    useTitle("Settings");

    const content: Content[] = [
        {
            key: "general_settings",
            label: "General Settings",
            children: <GeneralSettingsModule />,
        },
        {
            key: "general_settings",
            label: "Test Settings",
            children: <GeneralSettingsModule />,
        },
    ];

    return <TabsContent content={content} />;
};

export default Settings;
