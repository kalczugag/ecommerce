import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCategories = createAsyncThunk("categories/fetch", async () => {
    const response = await axios.get("http://localhost:3005/categories");

    return response.data;
});

export { fetchCategories };
