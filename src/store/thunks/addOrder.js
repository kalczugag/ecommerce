import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addOrder = createAsyncThunk("orders/fetch", async (post) => {
    const response = axios.post("http://localhost:3005/orders", {
        item: post.title,
        itemId: post.id,
    });

    return response.data;
});

export { addOrder };
