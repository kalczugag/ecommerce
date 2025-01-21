import { useSearchParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { Manage } from "./types/Manage";
import { Order } from "@/types/Order";
import Loading from "@/components/Loading";

const a11Props = (index: number) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
});

interface ManageModuleProps {
    config: Manage[];
    data?: Order;
    isLoading: boolean;
}

const ManageModule = ({ config, data, isLoading }: ManageModuleProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTab = parseInt(searchParams.get("tab") || "0");

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setSearchParams({ tab: newValue });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: "1px", borderColor: "divider" }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    {config.map((tab, index) => (
                        <Tab
                            key={tab.key}
                            label={tab.label}
                            {...a11Props(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            <Loading isLoading={isLoading}>
                {config.map((tab, index) => (
                    <div
                        key={tab.key}
                        role="tabpanel"
                        hidden={currentTab !== index}
                    >
                        {currentTab === index && (
                            <Box sx={{ p: 3 }}>{tab.element}</Box>
                        )}
                    </div>
                ))}
            </Loading>
        </Box>
    );
};

export default ManageModule;
