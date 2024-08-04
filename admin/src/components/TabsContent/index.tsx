import SettingsLayout from "@/layouts/SettingsLayout";
import type { Content } from "@/types/Content";

interface TabsContentProps {
    content: Content[];
}

const TabsContent = ({ content }: TabsContentProps) => {
    const items = content.map((item) => (
        <SettingsLayout key={item.key} label={item.label}>
            {item.children}
        </SettingsLayout>
    ));

    return items;
};

export default TabsContent;
