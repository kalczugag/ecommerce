import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        itemsCount: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
            state.totalPrice += action.payload.price;
            state.itemsCount += 1;
        },

        removeFromCart(state, action) {
            state.items = state.items.filter((post) => {
                return post.id !== action.payload.id;
            });
            state.totalPrice -= action.payload.price;
            state.itemsCount -= 1;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
