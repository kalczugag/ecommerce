import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

export const campaignsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCampaigns: builder.query<
            ApiResponseArray<FeaturedCampaign>,
            Paginate | void
        >({
            query: ({ skip, limit, search, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, any> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (search !== undefined) {
                    queryParams.search = search.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/admin/campaigns",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (data) =>
                data
                    ? data.result.map((campaign) => ({
                          type: "Campaigns",
                          id: campaign._id,
                      }))
                    : [{ type: "Campaigns", id: "LIST" }],
        }),

        getCampaignById: builder.query<
            ApiResponseObject<FeaturedCampaign>,
            string
        >({
            query: (id) => ({
                url: `/admin/campaigns/id/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [
                { type: "Campaigns", id: id },
                { type: "Campaigns", id: "GLOBAL" },
            ],
        }),

        addCampaign: builder.mutation<
            ApiResponseObject<FeaturedCampaign>,
            FeaturedCampaign
        >({
            query: (values) => ({
                url: "/admin/campaigns",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Campaigns", id: values._id },
                { type: "Campaigns", id: "GLOBAL" },
            ],
        }),
    }),
});

export const {
    useGetAllCampaignsQuery,
    useGetCampaignByIdQuery,
    useAddCampaignMutation,
} = campaignsApi;
