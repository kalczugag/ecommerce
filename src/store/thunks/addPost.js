import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addPost = createAsyncThunk("posts/add", async (post) => {
    const response = await axios.post("http://localhost:3005/posts", {
        title: post.title,
        description: post.description,
        price: post.price,
    });

    return response.data;
});

export { addPost };
