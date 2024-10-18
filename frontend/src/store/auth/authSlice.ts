import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
    token: string | null;
    isAdmin: boolean;
    expires: string | null;
    userId: string | null;
    cartId: string | null;
}

const initialState: AuthState = {
    token: null,
    isAdmin: false,
    expires: null,
    userId: null,
    cartId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            return {
                ...state,
                token: action.payload.token,
                isAdmin: action.payload.isAdmin,
                expires: action.payload.expires,
                userId: action.payload.userId,
                cartId: action.payload.cartId,
            };
        },

        logOut: (state) => {
            return {
                ...state,
                token: null,
                isAdmin: false,
                expires: null,
                userId: null,
                cartId: null,
            };
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export type { AuthState };

export const selectTokenExpiresIn = (state: RootState) => state.auth.expires;
export const selectCurrentToken = (state: RootState) => state.auth.token;
