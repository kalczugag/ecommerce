import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editOrder = createAsyncThunk("orders/edit", async (order) => {
    const response = await axios.put(
        `http://localhost:3005/orders/${order.id}`,
        {
            item: order.item,
            itemId: order.itemId,
            price: order.price,
            status: order.status,
        }
    );

    return response.data;
});

export { editOrder };
