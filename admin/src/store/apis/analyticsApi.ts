import { apiSlice } from "./apiSlice";
import {
    DailySummary,
    SummaryByCountry,
    DailySummaryQueryParams,
} from "@/types/Analytics";

interface ResultDataProps {
    todayOrDate: DailySummary[];
    last30Days: DailySummary[];
    last6Months: {
        month: number;
        year: number;
        pageViews: number;
    }[];
    users: {
        total: number;
        byCountry: SummaryByCountry[];
    };
}

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDailySummary: builder.query<
            ApiResponseObject<ResultDataProps>,
            DailySummaryQueryParams | void
        >({
            query: (params: DailySummaryQueryParams = {}) => ({
                url: "/admin/analytics/dailySummary",
                method: "GET",
                params,
            }),
        }),

        getProductDailySummary: builder.query<
            ApiResponseArray<DailySummary>,
            DailySummaryQueryParams | void
        >({
            query: (params: DailySummaryQueryParams = {}) => ({
                url: "/admin/analytics/productDailySummary",
                method: "GET",
                params,
            }),
        }),
    }),
});

export const { useGetDailySummaryQuery, useGetProductDailySummaryQuery } =
    analyticsApi;
