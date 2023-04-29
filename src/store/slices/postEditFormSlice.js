import { createSlice } from "@reduxjs/toolkit";

const postEditFormSlice = createSlice({
    name: "postAddForm",
    initialState: {
        title: "",
        description: "",
        price: 0,
        image: null,
    },
    reducers: {
        changeEditTitle(state, action) {
            state.title = action.payload;
        },
        changeEditDescription(state, action) {
            state.description = action.payload;
        },
        changeEditPrice(state, action) {
            state.price = action.payload;
        },
        changeEditImage(state, action) {
            state.image = action.payload;
        },
    },
});

export const postEditFormReducer = postEditFormSlice.reducer;
export const {
    changeEditTitle,
    changeEditDescription,
    changeEditPrice,
    changeEditImage,
} = postEditFormSlice.actions;
