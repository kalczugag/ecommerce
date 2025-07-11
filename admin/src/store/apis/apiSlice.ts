import {
    BaseQueryApi,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { RootState } from "..";

const baseQuery = fetchBaseQuery({
    baseUrl:
        import.meta.env.MODE === "production"
            ? import.meta.env.VITE_BACKEND_SERVER + "/api/v1"
            : window.location.protocol +
              "//" +
              window.location.host +
              "/api/v1",

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;

        if (token) {
            headers.set("authorization", token);
        }

        return headers;
    },
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery(
            "/auth/refresh",
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            const state = api.getState() as RootState;
            const expires = state.auth.expires;

            api.dispatch(
                setCredentials({
                    token: (refreshResult.data as { token: string }).token,
                    isAdmin: state.auth.isAdmin,
                    expires,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
    tagTypes: [
        "Orders",
        "Products",
        "Users",
        "Categories",
        "Payments",
        "Shipments",
        "Notes",
        "Campaigns",
    ],
});
