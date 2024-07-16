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
  WritableCtcApiResponse,
  WritableTiersResponse,
  WritableDesignationsResponse,
  WritableSettingResponse,
  WritableCategoriesResponse,
  Filters,
  WritableBuyPassData,
  WritableBuyPassResponse,
} from "@/types/index";

import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./global.api";
import { AnyNaptrRecord } from "dns";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: [
    "Blogs",
    "BlogsbyId",
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
    "AdditionalPerk",
    "Tier",
    "Designation",
    "Setting",
    "Categories",
    "SingleEventByTitle",
    "SingleDiscussionByTitle",
    "JobById",
    "GetFilterJob",
    "BuyPassForEvent",
    "GetJobUserById",
    "CTCDataById",
    "DeleteAppliedJobs"
  ],
});

const globalApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsData: builder.query<BlogResponse, string>({
      query: queries.getBlogs.query,
      providesTags: ["Blogs"],
    }),
    getBlogsDataById: builder.mutation<BlogResponse, string>({
      query: (id) => queries.getBlogsById.query(id),
      invalidatesTags: ["BlogsbyId"],
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
    getCtcDataById: builder.mutation<any, string>({
      query: queries.getCtcDataById.query,
      invalidatesTags: ["CTCDataById"],
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
    getJobById: builder.mutation<WritableRecentJobResponse, string>({
      query: (id) => queries.getJobById.query(id),
      invalidatesTags: ["JobById"],
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
    getLocations: builder.query<WritableLocationResponse, void>({
      query: queries.getLocations.query,
      providesTags: ["Locations"],
    }),
    getEducations: builder.query<WritableEducationResponse, void>({
      query: queries.getEducations.query,
      providesTags: ["Educations"],
    }),
    getTags: builder.query<WritableTagResponse, void>({
      query: queries.getTags.query,
      providesTags: ["Tags"],
    }),
    getJobType: builder.query<WritableJobTypeResponse, void>({
      query: queries.getJobType.query,
      providesTags: ["JobType"],
    }),
    getCompensations: builder.query<WritableCompensationResponse, void>({
      query: queries.getCompensations.query,
      providesTags: ["Compensations"],
    }),
    getMembership: builder.query<WritableMembershipResponse, void>({
      query: queries.getMembership.query,
      providesTags: ["Membership"],
    }),
    getAdditionalPerk: builder.query<WritableAdditionalPerkResponse, void>({
      query: queries.getAdditionalPerk.query,
      providesTags: ["AdditionalPerk"],
    }),
    getTier: builder.query<WritableTiersResponse, void>({
      query: queries.getTier.query,
      providesTags: ["Tier"],
    }),
    getDesignation: builder.query<WritableDesignationsResponse, void>({
      query: queries.getDesignation.query,
      providesTags: ["Designation"],
    }),
    getSetting: builder.query<WritableSettingResponse, void>({
      query: queries.getSetting.query,
      providesTags: ["Setting"],
    }),
    getCategories: builder.query<WritableCategoriesResponse, void>({
      query: queries.getCategories.query,
      providesTags: ["Categories"],
    }),
    getSingleEventByTitle: builder.mutation<any, string>({
      query: (title) => queries.getSingleEventByTitle.query(title),
      invalidatesTags: ["SingleEventByTitle"],
    }),
    getSingleDiscussionByTitle: builder.mutation<any, string>({
      query: (title) => queries.getSingleDiscussionByTitle.query(title),
      invalidatesTags: ["SingleDiscussionByTitle"],
    }),
    getFilterJob: builder.mutation<SaveJobDataResponse, Filters>({
      query: (queryParams) => queries.getFilterJob.query(queryParams),
      invalidatesTags: ["GetFilterJob"],
    }),
    buyPassForEvent: builder.mutation<
      WritableBuyPassResponse,
      WritableBuyPassData
    >({
      query: (data) => queries.buyPassForEvent.query(data),
      invalidatesTags: ["BuyPassForEvent"],
    }),
    getJobUserById: builder.mutation<any, string>({
      query: (queryParams) => queries.getJobUserById.query(queryParams),
      invalidatesTags: ["GetJobUserById"],
    }),
    deleteAppliedJob : builder.mutation<any, string>({
      query: (jobId) => queries.deleteAppliedJob.query(jobId),
      invalidatesTags: ["DeleteAppliedJobs"],
    })
  }),
  overrideExisting: true,
});

export const {
  useGetBlogsDataQuery,
  useGetBlogsDataByIdMutation,
  useGetEventsQuery,
  useGetSectorQuery,
  useGetRecentJobsQuery,
  useGetAppliedJobsQuery,
  useGetCtcDataQuery,
  useGetCollageQuery,
  useGetIndustryQuery,
  useGetDiscussionQuery,
  useGetJobsQuery,
  useGetJobByIdMutation,
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
  useGetAdditionalPerkQuery,
  useGetTierQuery,
  useGetDesignationQuery,
  useGetSettingQuery,
  useGetCategoriesQuery,
  useGetSingleDiscussionByTitleMutation,
  useGetSingleEventByTitleMutation,
  useGetFilterJobMutation,
  useBuyPassForEventMutation,
  useGetJobUserByIdMutation,
  useGetCtcDataByIdMutation,
  useDeleteAppliedJobMutation
} = globalApi;
export default globalApi;
