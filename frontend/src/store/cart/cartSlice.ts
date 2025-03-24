import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    drawerOpen: boolean;
}

const initialState: CartState = {
    drawerOpen: true,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawerOpen = action.payload;
        },
    },
});

export const { setDrawer } = cartSlice.actions;

export default cartSlice.reducer;
export type { CartState };
