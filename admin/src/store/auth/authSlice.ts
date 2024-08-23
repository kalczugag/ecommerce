import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
    token: string | null;
    expires: string | null;
}

const initialState: AuthState = {
    token: null,
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
                expires: action.payload.expires,
            };
        },

        logOut: (state) => {
            return {
                ...state,
                token: null,
                expires: null,
            };
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export type { AuthState };

export const selectTokenExpiresIn = (state: RootState) => state.auth.expires;
export const selectCurrentToken = (state: RootState) => state.auth.token;
