import { createApi } from "@reduxjs/toolkit/query/react";
import { BlogResponse, EventResponse } from "@/types/blog";
import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./global.api";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["Blogs", "Events"],
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
  }),
  overrideExisting: true,
});

export const {
  useGetBlogsDataQuery,
  useGetBlogsDataByIdQuery,
  useGetEventsQuery,
} = globalApi;
export default globalApi;
