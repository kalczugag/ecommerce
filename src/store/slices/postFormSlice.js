import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../thunks/addPost";

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
        changeImage(state, action) {
            state.image = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.title = "";
            state.description = "";
            state.price = 0;
        });
    },
});

export const postFormReducer = postFormSlice.reducer;
export const { changeTitle, changeDescription, changePrice, changeImage } =
    postFormSlice.actions;
