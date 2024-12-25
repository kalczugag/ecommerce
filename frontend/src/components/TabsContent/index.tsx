import DefaultLayout from "@/layouts/DefaultLayout";
import type { Content } from "@/types/Content";

interface TabsContentProps {
    content: Content[];
}

const TabsContent = ({ content }: TabsContentProps) => {
    const items = content.map((item) => (
        <DefaultLayout key={item.key}>{item.children}</DefaultLayout>
    ));

    return items;
};

export default TabsContent;
