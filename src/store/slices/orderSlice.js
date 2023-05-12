import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../thunks/fetchOrders";
import { addOrder } from "../thunks/addOrder";
import { editOrder } from "../thunks/editOrder";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        searchTerm: "",
        newOrders: 0,
    },
    reducers: {
        changeOrderSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.newOrders = 0;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.newOrders += 1;
        });
        builder.addCase(addOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(editOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.map((order) => {
                if (order.id === action.payload.id) {
                    return { ...order, ...action.payload };
                }
                return order;
            });
        });
        builder.addCase(editOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const { changeOrderSearchTerm } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
