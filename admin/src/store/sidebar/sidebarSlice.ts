import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SidebarContent } from "@/types/Content";

interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
export type { SidebarState };
