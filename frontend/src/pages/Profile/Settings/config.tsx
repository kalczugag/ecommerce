import GeneralSettingsModule from "@/modules/ProfileModule/Settings/GeneralSettingsModule";
import type { Content } from "@/types/Content";

export const config: Content[] = [
    {
        key: "general_settings",
        label: "General Settings",
        children: <GeneralSettingsModule />,
    },
];
