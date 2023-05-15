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
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );

            if (existingItem) {
                existingItem.count += 1;
                state.totalPrice += newItem.price;
            } else {
                state.items.push({ ...newItem, count: 1 });
                state.totalPrice += newItem.price;
            }
            state.itemsCount += action.payload.count;
        },

        removeFromCart(state, action) {
            const removedItems = state.items.filter(
                (item) => item.id === action.payload.id
            );

            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            state.totalPrice -= removedItems.reduce(
                (total, item) => total + item.price * item.count,
                0
            );
            state.itemsCount -= removedItems.reduce(
                (total, item) => total + item.count,
                0
            );
        },

        changeItemsAmount(state, action) {
            //when action.payload is negative it doesn't work
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.items[itemIndex].count !== 0) {
                state.items[itemIndex].count += action.payload.count;
                state.totalPrice += action.payload.price;
                state.itemsCount += action.payload.count;
            }
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemsAmount } =
    cartSlice.actions;
