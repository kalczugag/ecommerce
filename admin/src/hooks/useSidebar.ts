import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useStore";
import { setSidebarContent } from "@/store";
import type { SidebarContent } from "@/types/Content";

const deepEqual = (a: any, b: any) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const useSidebar = (config: SidebarContent[]) => {
    const dispatch = useAppDispatch();
    const prevConfig = useAppSelector((state) => state.sidebar.content);

    useEffect(() => {
        if (!deepEqual(prevConfig, config)) {
            dispatch(setSidebarContent(config));
        }

        return () => {
            if (!deepEqual(prevConfig, config)) {
                dispatch(setSidebarContent(prevConfig));
            }
        };
    }, [dispatch]);
};

export default useSidebar;
