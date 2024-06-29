import {
  BlogResponse,
  EventResponse,
  SectorResponse,
  WritableRecentJobResponse,
  WritableCollegeResponse,
  WritableIndustryResponse,
  WritableDiscussionResponse,
  ApplyJobData
} from "@/types/index";

import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./global.api";
import { AnyNaptrRecord } from "dns";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: [
    "Blogs",
    "Events",
    "Sector",
    "RecentJobs",
    "AppliedJobs",
    "CTCData",
    "Collage",
    "Industry",
    "Discussion",
    "Jobs",
    "ApplyJobs"
  ],
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
    getSector: builder.query<SectorResponse, void>({
      query: queries.getSector.query,
      providesTags: ["Sector"],
    }),
    getRecentJobs: builder.query<WritableRecentJobResponse, void>({
      query: queries.getRecentJobs.query,
      providesTags: ["RecentJobs"],
    }),
    getAppliedJobs: builder.query<any, void>({
      query: queries.getAppliedJobs.query,
      providesTags: ["AppliedJobs"],
    }),
    getCtcData: builder.query<any, void>({
      query: queries.getCtcData.query,
      providesTags: ["CTCData"],
    }),
    getCollage: builder.query<WritableCollegeResponse, void>({
      query: queries.getCollage.query,
      providesTags: ["Collage"],
    }),
    getIndustry: builder.query<WritableIndustryResponse, void>({
      query: queries.getIndustry.query,
      providesTags: ["Industry"],
    }),
    getDiscussion: builder.query<WritableDiscussionResponse, void>({
      query: queries.getDiscussion.query,
      providesTags: ["Discussion"],
    }),
    getJobs: builder.query<WritableRecentJobResponse, void>({
      query: queries.getJobs.query,
      providesTags: ["Jobs"],
    }),
    postApplyJob: builder.mutation<any, ApplyJobData>({ 
      query: (id) => queries.postApplyJob.query(id),
      invalidatesTags: ["ApplyJobs"]
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBlogsDataQuery,
  useGetBlogsDataByIdQuery,
  useGetEventsQuery,
  useGetSectorQuery,
  useGetRecentJobsQuery,
  useGetAppliedJobsQuery,
  useGetCtcDataQuery,
  useGetCollageQuery,
  useGetIndustryQuery,
  useGetDiscussionQuery,
  useGetJobsQuery,
  usePostApplyJobMutation,
} = globalApi;
export default globalApi;
