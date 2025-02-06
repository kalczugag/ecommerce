import { apiSlice } from "../apis/apiSlice";
import { logOut, setCredentials } from "./authSlice";

type AuthResult = {
    expires: string;
    success: boolean;
    isAdmin: boolean;
    token: string;
};

export type LoginInput = {
    email: string;
    password: string;
    recaptcha?: string;
};

export type RegisterInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    recaptcha?: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResult, LoginInput>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setCredentials({
                            token: data.token,
                            isAdmin: data.isAdmin,
                            expires: data.expires,
                        })
                    );
                } catch (err) {
                    console.error("Login error", err);
                }
            },
        }),

        register: builder.mutation<AuthResult, RegisterInput>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...data },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setCredentials({
                            token: data.token,
                            isAdmin: data.isAdmin,
                            expires: data.expires,
                        })
                    );
                } catch (err) {
                    console.error("Register error", err);
                }
            },
        }),

        refreshToken: builder.query<AuthResult, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        setCredentials({
                            token: data.token,
                            isAdmin: data.isAdmin,
                            expires: data.expires,
                        })
                    );
                } catch (err) {
                    console.error("Refresh token error", err);
                }
            },
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut());
                } catch (err) {
                    console.error("Logout error", err);
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRefreshTokenQuery,
    useRegisterMutation,
    useLogoutMutation,
} = authApiSlice;
