import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../thunks/fetchCategories";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const categoriesReducer = categoriesSlice.reducer;
