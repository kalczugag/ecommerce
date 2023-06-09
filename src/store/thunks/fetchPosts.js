import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPosts = createAsyncThunk("posts/fetch", async (post) => {
    let response;

    if (post) {
        response = await axios.get(`http://localhost:3005/posts/${post.id}`);
    } else if (post === "noImg") {
        response = await axios.get("http://localhost:3005/posts");
        response.data.forEach((post) => (post.image = ""));
    } else {
        response = await axios.get("http://localhost:3005/posts");
    }

    return response.data;
});

export { fetchPosts };
