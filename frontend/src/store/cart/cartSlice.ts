import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    anchorEl: null | HTMLElement;
    drawerOpen: boolean;
}

const initialState: CartState = {
    anchorEl: null,
    drawerOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.drawerOpen = action.payload;
        },

        toggleMenu: (state, action) => {
            state.anchorEl = action.payload;
        },
    },
});

export const { toggleDrawer, toggleMenu } = cartSlice.actions;

export default cartSlice.reducer;
export type { CartState };
