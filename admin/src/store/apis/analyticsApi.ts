import { apiSlice } from "./apiSlice";
import type {
    DailySummary,
    SummaryByCountry,
    DailySummaryQueryParams,
} from "@/types/Analytics";
import type { CampaignsGlobalSummary } from "@/types/FeaturedCampaign";

export interface ResultDataProps {
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
    prev30Days: {
        uniqueUsers: number;
        orders: number;
        earnings: number;
        sessions: {
            direct: number;
            organic: number;
            referral: number;
        };
    };
    prev6Months: {
        pageViews: number;
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

        getCampaignsGlobalSummary: builder.query<
            ApiResponseObject<CampaignsGlobalSummary>,
            void // todo all boolean
        >({
            query: () => ({
                url: "/admin/analytics/campaignsGlobalSummary",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetDailySummaryQuery,
    useGetProductDailySummaryQuery,
    useGetCampaignsGlobalSummaryQuery,
} = analyticsApi;
