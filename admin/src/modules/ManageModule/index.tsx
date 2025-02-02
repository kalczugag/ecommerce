import { useSearchParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { Manage } from "./types/Manage";
import Loading from "@/components/Loading";
import React, { cloneElement } from "react";

const a11Props = (index: number) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
});

interface ManageModuleProps {
    config: Manage[];
    data?: any;
    isLoading: boolean;
}

const ManageModule = ({ config, data, isLoading }: ManageModuleProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTab = parseInt(searchParams.get("tab") || "0");
    const currentSubTab = parseInt(searchParams.get("subTab") || "0");

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setSearchParams({ tab: newValue, subTab: "0" });
    };

    const handleSubTabChange = (
        newValue: number,
        additionalData?: { [key: string]: string }
    ) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", "0");
            newParams.set("pageSize", "5");
            newParams.set("subTab", newValue.toString());
            if (additionalData) {
                Object.entries(additionalData).forEach(([key, value]) => {
                    newParams.set(key, value);
                });
            }
            return newParams;
        });
    };

    const renderWithCustomArg = (tab: Manage, arg?: Record<string, any>) => {
        if (!data) return null;

        return <>{cloneElement(tab.element(data), { ...arg })}</>;
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
                            <Box sx={{ p: 3 }}>
                                {tab.subTabs
                                    ? currentSubTab === 0
                                        ? renderWithCustomArg(tab, {
                                              currentSubTab,
                                              handleSubTabChange,
                                          })
                                        : renderWithCustomArg(
                                              tab.subTabs[currentSubTab - 1],
                                              {
                                                  currentSubTab,
                                                  handleSubTabChange,
                                              }
                                          )
                                    : renderWithCustomArg(tab)}
                            </Box>
                        )}
                    </div>
                ))}
            </Loading>
        </Box>
    );
};

export default ManageModule;
