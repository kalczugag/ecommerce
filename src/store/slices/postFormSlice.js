import { createSlice } from "@reduxjs/toolkit";

const postFormSlice = createSlice({
    name: "postForm",
    initialState: {
        title: "",
        description: "",
        price: 0,
        image: null,
    },
    reducers: {
        changeTitle(state, action) {
            state.title = action.payload;
        },
        changeDescription(state, action) {
            state.description = action.payload;
        },
        changePrice(state, action) {
            state.price = action.payload;
        },
    },
});

export const postFormReducer = postFormSlice.reducer;
export const { changeTitle, changeDescription, changePrice } =
    postFormSlice.actions;
