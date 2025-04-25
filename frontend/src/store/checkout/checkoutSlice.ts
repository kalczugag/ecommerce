import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Item, ShippingAddress } from "@/types/Order";
import type { User } from "@/types/User";

interface CheckoutState {
    products: Item[];
    userData?: User;
    subTotal: number;
    discount?: number;
    deliveryCost?: number;
    total: number;
    _deliveryMethod?: string;
    shippingAddress?: ShippingAddress;
    billingAddress?: ShippingAddress;
    initialized: boolean;
}

interface ActionPayload extends Omit<CheckoutState, "initialized"> {}

const initialState: CheckoutState = {
    products: [],
    userData: undefined,
    subTotal: 0,
    discount: 0,
    deliveryCost: 0,
    total: 0,
    initialized: false,
    _deliveryMethod: undefined,
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

        setUser: (state, action: PayloadAction<User>) => ({
            ...state,
            userData: action.payload,
        }),

        resetCheckout: () => initialState,
    },
});

export const { initializeCheckout, updateCheckout, setUser, resetCheckout } =
    checkoutSlice.actions;

export default checkoutSlice.reducer;
export type { CheckoutState };
