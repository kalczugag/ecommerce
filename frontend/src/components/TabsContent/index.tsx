import { useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import NavLinksMenu, { NavLink } from "../NavLinksMenu";

interface TabsContentProps {
    content: NavLink[];
    nav?: boolean;
}

const TabsContent = ({ content, nav }: TabsContentProps) => {
    const [activeTab, setActiveTab] = useState(content[0]?.key || "");

    const activeContent = content.find((item) => item.key === activeTab);

    return (
        <DefaultLayout direction="row" className="space-x-10">
            {nav && (
                <NavLinksMenu
                    links={content.map((item) => ({
                        ...item,
                        onClick: () => setActiveTab(item.key),
                    }))}
                    activeKey={activeTab}
                />
            )}
            <div className="flex-1">
                {activeContent?.children || <p>Select a tab to see content.</p>}
            </div>
        </DefaultLayout>
    );
};

export default TabsContent;
