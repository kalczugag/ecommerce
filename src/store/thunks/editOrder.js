import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editOrder = createAsyncThunk("orders/fetch", async (order) => {
    const response = axios.put(`http://localhost:3005/orders/${order.id}`, {});

    return response.data;
});

export { editOrder };
