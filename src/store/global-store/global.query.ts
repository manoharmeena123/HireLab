import {
  BlogResponse,
  EventResponse,
  SectorResponse,
  WritableRecentJobResponse,
  WritableCollegeResponse,
  WritableIndustryResponse,
  WritableDiscussionResponse,
  ApplyJobData,
  WritableTestimonialResponse,
  SaveJobData,
  SaveJobDataResponse,
  ApplyJobResponse,
  WritableGetSaveJobResponse,
  WritableEducationResponse,
  WritableLocationResponse,
  WritableTagResponse,
  WritableJobTypeResponse,
  WritableCompensationResponse,
  WritableMembershipResponse,
  WritableAdditionalPerkResponse,
  WritableCtcApiResponse
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
    "ApplyJobs",
    "Testimonials",
    "SaveJobs",
    "GetSaveJobs",
    "DeleteSaveJobs",
    "Locations",
    "Educations",
    "Tags",
    "JobType",
    "Compensations",
    "Membership",
    "AdditionalPerk"
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
    getCtcData: builder.query<WritableCtcApiResponse, void>({
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
    postApplyJob: builder.mutation<ApplyJobResponse, ApplyJobData>({
      query: (id) => queries.postApplyJob.query(id),
      invalidatesTags: ["ApplyJobs"],
    }),
    getTestimonials: builder.query<WritableTestimonialResponse, void>({
      query: queries.getTestimonials.query,
      providesTags: ["Testimonials"],
    }),
    postSaveJob: builder.mutation<SaveJobDataResponse, SaveJobData>({
      query: (id) => queries.postSaveJob.query(id),
      invalidatesTags: ["SaveJobs"],
    }),
    getSavedJob: builder.query<WritableGetSaveJobResponse, void>({
      query: queries.getSavedJob.query,
      providesTags: ["GetSaveJobs"],
    }),
    deleteSavedJob: builder.mutation<WritableGetSaveJobResponse, string>({
      query: (id) => queries.deleteSavedJob.query(id),
      invalidatesTags: ["DeleteSaveJobs"],
    }),
    getLocations : builder.query<WritableLocationResponse, void>({
      query: queries.getLocations.query,
      providesTags: ["Locations"]
    }),
    getEducations : builder.query<WritableEducationResponse, void>({
      query: queries.getEducations.query,
      providesTags: ["Educations"]
    }),
    getTags : builder.query<WritableTagResponse, void>({
      query: queries.getTags.query,
      providesTags: ["Tags"]
    }),
    getJobType : builder.query<WritableJobTypeResponse, void>({
      query: queries.getJobType.query,
      providesTags: ["JobType"]
    }),
    getCompensations : builder.query <WritableCompensationResponse, void>({
      query: queries.getCompensations.query,
      providesTags: ["Compensations"]
    }),
    getMembership : builder.query<WritableMembershipResponse, void>({
      query: queries.getMembership.query,
      providesTags: ["Membership"]
    }),
    getAdditionalPerk : builder.query<WritableAdditionalPerkResponse,void>({
      query :queries.getAdditionalPerk.query,
      providesTags: ["AdditionalPerk"]
    })
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
  useGetTestimonialsQuery,
  usePostSaveJobMutation,
  useGetSavedJobQuery,
  useDeleteSavedJobMutation,
  useGetLocationsQuery,
  useGetEducationsQuery,
  useGetTagsQuery,
  useGetJobTypeQuery,
  useGetCompensationsQuery,
  useGetMembershipQuery,
  useGetAdditionalPerkQuery
} = globalApi;
export default globalApi;
