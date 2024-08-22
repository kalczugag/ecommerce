import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
    token: string | null;
    user: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            };
        },

        logOut: (state) => {
            return {
                ...state,
                token: null,
                user: null,
            };
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export type { AuthState };

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
