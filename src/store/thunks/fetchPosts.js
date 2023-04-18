import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const response = await axios.get("http://localhost:3005/posts");

    return response.data;
});

export { fetchPosts };
