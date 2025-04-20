import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Item } from "@/types/Order";

interface CheckoutState {
    products: Item[];
    subTotal: number;
    discount?: number;
    deliveryCost?: number;
    total: number;
    initialized: boolean;
}

interface ActionPayload extends Omit<CheckoutState, "initialized"> {}

const initialState: CheckoutState = {
    products: [],
    subTotal: 0,
    discount: 0,
    deliveryCost: 0,
    total: 0,
    initialized: false,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        initializeCheckout: (state, action: PayloadAction<ActionPayload>) => ({
            ...state,
            ...action.payload,
            initialized: true,
        }),

        updateCheckout: (
            state,
            action: PayloadAction<Partial<ActionPayload>>
        ) => ({ ...state, ...action.payload }),
    },
});

export const { initializeCheckout, updateCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
export type { CheckoutState };
