import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    isOpen: boolean;
    collapsed: boolean;
}

const initialState: SidebarState = {
    isOpen: false,
    collapsed: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },

        toggleCollapsed(state, action: PayloadAction<boolean>) {
            state.collapsed = action.payload;
        },
    },
});

export const { toggleSidebar, toggleCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;
export type { SidebarState };
