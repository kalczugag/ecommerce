import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removePost = createAsyncThunk("posts/remove", async (post) => {
    await axios.delete(`http://localhost:3005/posts/${post.id}`);

    return post;
});

export { removePost };
