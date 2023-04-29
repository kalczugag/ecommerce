import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const editPost = createAsyncThunk("posts/edit", async (post) => {
    const response = await axios.put(`http://localhost:3005/posts/${post.id}`, {
        title: post.title,
        description: post.description,
        price: post.price,
        image: post.image,
    });

    return response.data;
});

export { editPost };
