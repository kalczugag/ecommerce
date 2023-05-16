import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";
import { addPost } from "../thunks/addPost";
import { removePost } from "../thunks/removePost";
import { editPost } from "../thunks/editPost";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        searchTerm: "",
    },
    reducers: {
        changePostSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        // togglePostWishlist(state, action) {
        //     const postId = action.payload;
        //     const post = state.data.find((post) => post.id === postId);
        //     if (post) {
        //         post.wishlist = !post.wishlist;
        //     }
        // },
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
            state.isLoading = false;
            state.data = state.data.filter((post) => {
                return post.id !== action.payload.id;
            });
        });
        builder.addCase(removePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(editPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.map((post) => {
                if (post.id === action.payload.id) {
                    return { ...post, ...action.payload };
                }
                return post;
            });
        });
        builder.addCase(editPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const { changePostSearchTerm, togglePostWishlist } = postSlice.actions;
export const postsReducer = postSlice.reducer;
