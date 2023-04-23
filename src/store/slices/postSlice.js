import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";
import { addPost } from "../thunks/addPost";
import { removePost } from "../thunks/removePost";

const postSlice = createSlice({
    name: "posts",
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
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removePost.pending, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.data.filter((post) => {
                return post.id !== action.payload.id;
            });
        });
        builder.addCase(removePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const postsReducer = postSlice.reducer;
