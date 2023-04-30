import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isDev: false,
    },
    reducers: {
        changeDevMode(state, action) {
            state.isDev = action.payload;
        },
    },
});

export const adminReducer = adminSlice.reducer;
export const { changeDevMode } = adminSlice.actions;
