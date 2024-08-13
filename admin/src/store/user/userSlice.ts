import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/react";
import axios from "axios";

type LoginParams = {
    email: string;
    password: string;
};

export type RegisterParams = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

interface UserState {
    token: string | null;
    isLoading: boolean;
    isSuccess: boolean;
    error: any;
}

const tokenFromStorage = localStorage.getItem("authToken");

const initialState: UserState = {
    token: tokenFromStorage ? tokenFromStorage : null,
    isSuccess: false,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<{ token: string }>) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.token = action.payload.token;

                    localStorage.setItem("authToken", action.payload.token);
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                register.fulfilled,
                (state, action: PayloadAction<{ token: string }>) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.token = action.payload.token;

                    localStorage.setItem("authToken", action.payload.token);
                }
            )
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const login = createAsyncThunk(
    "user/login",
    async (data: LoginParams) => {
        const response = await axios.post("/api/v1/auth/login", data);

        return response.data;
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (data: RegisterParams) => {
        const response = await axios.post("/api/v1/auth/register", data);

        return response.data;
    }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
export type { UserState };
