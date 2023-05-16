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
            const { id, amount } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                if (amount === -1 && item.count === 1) {
                    return;
                }

                const newCount = item.count + amount;
                item.count = newCount > 0 ? newCount : 0;
                state.itemsCount += amount;
                state.totalPrice += item.price * amount;
            }
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemsAmount } =
    cartSlice.actions;
