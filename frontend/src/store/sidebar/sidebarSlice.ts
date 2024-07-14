import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
    colorsCount: {
        color: string;
        count: number;
    }[];
    availableSizes: string[];
    maxPrice: number;
}

interface InitialState {
    data: SidebarState | null;
}

const initialState: InitialState = {
    data: null,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<SidebarState>) {
            state.data = action.payload;
        },
    },
});

export const { setData } = sidebarSlice.actions;
export default sidebarSlice.reducer;
