import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addOrder = createAsyncThunk("orders/add", async (order) => {
    const response = await axios.post("http://localhost:3005/orders", {
        item: order.item,
        itemId: order.itemId,
        price: order.price,
        status: order.status,
    });

    return response.data;
});

export { addOrder };
