import SettingsLayout from "@/layouts/SettingsLayout";
import GeneralSettingsModule from "@/modules/SettingsModule/GeneralSettingsModule";

const GeneralSettings = () => {
    return (
        <SettingsLayout label="General Settings">
            <GeneralSettingsModule />
        </SettingsLayout>
    );
};

export default GeneralSettings;
