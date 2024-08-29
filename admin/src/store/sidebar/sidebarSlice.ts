import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sidebarLinksConfig as config } from "@/config/sidebarLinksConfig";
import type { SidebarContent } from "@/types/Content";

interface SidebarState {
    content: SidebarContent[];
    isOpen: boolean;
}

const initialState: SidebarState = {
    content: config,
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setSidebarContent(state, action: PayloadAction<SidebarContent[]>) {
            state.content = action.payload;
        },
    },
});

export const { setSidebarContent, toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
export type { SidebarState };
