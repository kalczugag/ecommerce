import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Item, ShippingAddress } from "@/types/Order";
import type { User } from "@/types/User";

interface CheckoutState {
    products: Item[];
    userData?: User;
    paymentInfo?: {
        paymentType: string;
        cardHolder: string;
        last4: string;
        expDate: string;
        brand: string;
    };
    subTotal: number;
    discount?: number;
    deliveryCost?: number;
    total: number;
    _deliveryMethod?: string;
    shippingAddress?: ShippingAddress;
    billingAddress?: ShippingAddress;
    initialized: boolean;
    stripeClientSecret?: string;
}

interface CheckoutActionPayload extends Omit<CheckoutState, "initialized"> {}

const initialState: CheckoutState = {
    products: [],
    userData: undefined,
    paymentInfo: undefined,
    subTotal: 0,
    discount: 0,
    deliveryCost: 0,
    total: 0,
    initialized: false,
    _deliveryMethod: undefined,
    stripeClientSecret: undefined,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        initializeCheckout: (
            state,
            action: PayloadAction<CheckoutActionPayload>
        ) => ({
            ...state,
            ...action.payload,
            initialized: true,
        }),

        updateCheckout: (
            state,
            action: PayloadAction<Partial<CheckoutActionPayload>>
        ) => ({ ...state, ...action.payload }),

        setUser: (state, action: PayloadAction<User>) => ({
            ...state,
            userData: action.payload,
        }),

        resetCheckout: () => initialState,

        setStripeClientSecret: (state, action: PayloadAction<string>) => ({
            ...state,
            stripeClientSecret: action.payload,
        }),
    },
});

export const {
    initializeCheckout,
    updateCheckout,
    setUser,
    resetCheckout,
    setStripeClientSecret,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
export type { CheckoutState, CheckoutActionPayload };
