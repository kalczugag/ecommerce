import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        searchTerm: "",
    },
    reducers: {
        changeSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
    },
});

export const postReducer = postSlice.reducer;
