import { BlogResponse, EventResponse,SectorResponse,WritableRecentJobResponse } from "@/types/index";

import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./global.api";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["Blogs", "Events",'Sector','RecentJobs'],
});

const globalApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsData: builder.query<BlogResponse, string>({
      query: queries.getBlogs.query,
      providesTags: ["Blogs"],
    }),
    getBlogsDataById: builder.query<BlogResponse, string>({
      query: (id) => queries.getBlogsById.query(id),
      providesTags: ["Blogs"],
    }),
    getEvents: builder.query<EventResponse, void>({
      query: queries.getEvents.query,
      providesTags: ["Events"],
    }),
    getSector : builder.query<SectorResponse, void>({
      query:queries.getSector.query,
      providesTags: ["Sector"],
    }),
    getRecentJobs :builder.query<WritableRecentJobResponse,void>({
      query: queries.getRecentJobs.query,
      providesTags: ["RecentJobs"],
    })
  }),
  overrideExisting: true,
});

export const {
  useGetBlogsDataQuery,
  useGetBlogsDataByIdQuery,
  useGetEventsQuery,
  useGetSectorQuery,
  useGetRecentJobsQuery
} = globalApi;
export default globalApi;
