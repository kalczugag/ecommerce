import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postSlice";
import { postFormReducer } from "./slices/postFormSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        postForm: postFormReducer,
    },
});

export * from "./slices/postFormSlice";
export * from "./thunks/fetchPosts";
export * from "./thunks/addPost";
export * from "./thunks/removePost";
