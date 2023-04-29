import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, changeSearchTerm } from "./slices/postSlice";
import { postAddFormReducer } from "./slices/postAddFormSlice";
import { cartReducer } from "./slices/cartSlice";
import { postEditFormReducer } from "./slices/postEditFormSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        postAddForm: postAddFormReducer,
        postEditForm: postEditFormReducer,
        cart: cartReducer,
    },
});

export * from "./slices/postAddFormSlice";
export * from "./slices/postEditFormSlice";
export * from "./slices/cartSlice";
export * from "./thunks/fetchPosts";
export * from "./thunks/addPost";
export * from "./thunks/removePost";
export * from "./thunks/editPost";
export { changeSearchTerm };
