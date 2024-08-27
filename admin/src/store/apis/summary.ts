import { apiSlice } from "./apiSlice";
import { Summary } from "@/types/Summary";

export const summaryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<Summary[], void>({
            query: () => ({
                url: "/summary",
                method: "GET",
            }),
        }),

        updateVisitorCount: builder.mutation<void, { isLoggedIn: boolean }>({
            query: ({ isLoggedIn }) => ({
                url: "/summary",
                method: "POST",
                body: isLoggedIn,
            }),
        }),
    }),
});

export const { useGetSummaryQuery, useUpdateVisitorCountMutation } = summaryApi;
