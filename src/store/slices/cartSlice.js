import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
        },

        removeFromCart(state, action) {
            state.items.filter((post) => {
                return post.id !== action.payload.id;
            });
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
