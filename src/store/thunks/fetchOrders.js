import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchOrders = createAsyncThunk("orders/fetch", async () => {
    const response = axios.get("http://localhost:3005/orders");

    return response.data;
});

export { fetchOrders };
