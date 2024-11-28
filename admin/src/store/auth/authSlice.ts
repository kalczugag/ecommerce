import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
    token: string | null;
    isAdmin: boolean;
    expires: string | null;
}

const initialState: AuthState = {
    token: null,
    isAdmin: false,
    expires: null,
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
            };
        },

        logOut: (state) => {
            return {
                ...state,
                token: null,
                isAdmin: false,
                expires: null,
            };
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export type { AuthState };
