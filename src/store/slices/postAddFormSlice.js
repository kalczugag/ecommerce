import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../thunks/addPost";

const postAddFormSlice = createSlice({
    name: "postAddForm",
    initialState: {
        title: "",
        description: "",
        category: "",
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
        changeCategory(state, action) {
            state.category = action.payload;
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
            state.category = "";
            state.price = 0;
            state.image = null;
        });
    },
});

export const postAddFormReducer = postAddFormSlice.reducer;
export const {
    changeTitle,
    changeDescription,
    changeCategory,
    changePrice,
    changeImage,
} = postAddFormSlice.actions;
