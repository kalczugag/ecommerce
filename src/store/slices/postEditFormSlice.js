import { createSlice } from "@reduxjs/toolkit";
import { editPost } from "../thunks/editPost";

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
    extraReducers(builder) {
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.title = "";
            state.description = "";
            state.price = 0;
            state.image = null;
        });
    },
});

export const postEditFormReducer = postEditFormSlice.reducer;
export const {
    changeEditTitle,
    changeEditDescription,
    changeEditPrice,
    changeEditImage,
} = postEditFormSlice.actions;
