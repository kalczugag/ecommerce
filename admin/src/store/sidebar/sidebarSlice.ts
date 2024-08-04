import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "./config";
import type { SidebarContent } from "@/types/Content";

export interface SidebarState {
    content: SidebarContent[];
}

export const initialState: SidebarState = {
    content: config,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebarContent(state, action: PayloadAction<SidebarContent[]>) {
            state.content = action.payload;
        },
    },
});

export const { setSidebarContent } = sidebarSlice.actions;

export default sidebarSlice.reducer;
