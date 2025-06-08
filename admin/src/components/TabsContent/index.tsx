import SettingsLayout from "@/layouts/SettingsLayout";
import type { Content } from "@/types/Content";
import { Divider, Stack } from "@mui/material";

interface TabsContentProps {
    content: Content[];
}

const TabsContent = ({ content }: TabsContentProps) => {
    const items = content.map((item) => (
        <SettingsLayout key={item.key} label={item.label}>
            {item.children}
        </SettingsLayout>
    ));

    return (
        <Stack direction="column" spacing={4} divider={<Divider />}>
            {items}
        </Stack>
    );
};

export default TabsContent;
