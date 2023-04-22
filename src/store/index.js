import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postSlice";
import { postFormReducer } from "./slices/postFormSlice";
import { cartReducer } from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        postForm: postFormReducer,
        cart: cartReducer,
    },
});

export * from "./slices/postFormSlice";
export * from "./slices/cartSlice";
export * from "./thunks/fetchPosts";
export * from "./thunks/addPost";
export * from "./thunks/removePost";
