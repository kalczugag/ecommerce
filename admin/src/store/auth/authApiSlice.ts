import { apiSlice } from "../apis/apiSlice";

type LoginResult = {
    expires: string;
    success: boolean;
    token: string;
};

type Credentials = {
    email: string;
    password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResult, Credentials>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
