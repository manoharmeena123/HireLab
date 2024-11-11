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
  CreateCommentType,
  SettingResponse,
  BannerResponse,
  SaveContactData,
  SaveContactDataResponse,
  WritableServiceResponse,
  WritableReferralResponse,
  WritableSupportResponse,
  WritableRefundPolicyResponse,
  WritableCtcStaticTextResponse,
  WritableSingleBlogCommentPost,
} from "@/types/index";

import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./global.api";

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
    "UpComingEvents",
    "PastEvents",
    "EventText",
    "SingleDiscussionByTitle",
    "BuyPassForEvent",
    "JobById",
    "GetFilterJob",
    "GetJobUserById",
    "CTCDataById",
    "DeleteAppliedJobs",
    "DeleteCommentById",
    "GetCommentForQuetion",
    "GetCommentForParentComment",
    "CreateComment",
    "Banner",
    "Settings",
    "SaveContacts",
    "Service",
    "SingleService",
    "ReferralTerms",
    "Support",
    "RefundPolicy",
    "CtcText",
    "Grievances",
    "SingleBlogComment",
    "SingleBlogCommentById",
    "SingleParentBlogCommentById",
    "CategoryJobs",
    "RecentBlogs",
    "CategoryJobById",
    "CreateAccount",
    "Counts",
    "AddLikeDiscussion",
    "DeleteBlogComment",
    "UpdateBlogComment",
    "CreateDiscussion",
    "DeleteDiscussion",
    "UpdateDiscussion",
    "UserlistDiscussion",
    "RecentJobSeekerJob",
    "MyTransactions",
    "UpdateDiscussionComment",
    "GetExperience",
    "CvDownload",
    "GetCommunity",
    "GetProfileData",
    "GetHomeBanner",
    "WhyChooseUs",
    "AddScreenShot",
    "GetSubscription",
    "GetBilling",
    "MakeUserPrivate",
    "MakeUserPublic",
    "MakeUserActivate",
    "MakeUserDeactivate",
    "GetFeedback",
    "SaveFeedback",
    "DeleteUser",
    "GetJobTitleSuggestion"
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
    updateBlogComment : builder.mutation<any,any>({
      query :(data)=> queries.updateBlogComment.query(data),
      invalidatesTags: ["UpdateBlogComment"],
    }),
    getEvents: builder.query<EventResponse, void>({
      query: queries.getEvents.query,
      providesTags: ["Events"],
    }),
    getEventText: builder.query<WritableCtcStaticTextResponse, void>({
      query: queries.getEventText.query,
      providesTags: ["EventText"],
    }),
    getUpComingEvents: builder.query<any, void>({
      query: queries.getUpComingEvents.query,
      providesTags: ["UpComingEvents"],
    }),
    getPastEvents: builder.query<any, void>({
      query: queries.getPastEvents.query,
      providesTags: ["PastEvents"],
    }),
    buyPassForEvent: builder.mutation<
      any,
      any
    >({
      query: (data) => queries.buyPassForEvent.query(data),
      invalidatesTags: ["BuyPassForEvent"],
    }),
    getSingleEventByTitle: builder.mutation<any, string>({
      query: (title) => queries.getSingleEventByTitle.query(title),
      invalidatesTags: ["SingleEventByTitle"],
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
    getCtcText: builder.query<WritableCtcStaticTextResponse, void>({
      query: queries.getCtcText.query,
      providesTags: ["CtcText"],
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

    getCategories: builder.query<WritableCategoriesResponse, void>({
      query: queries.getCategories.query,
      providesTags: ["Categories"],
    }),
    getSingleDiscussionByTitle: builder.mutation<any, string>({
      query: (title) => queries.getSingleDiscussionByTitle.query(title),
      invalidatesTags: ["SingleDiscussionByTitle"],
    }),
    getFilterJob: builder.mutation<SaveJobDataResponse, Filters>({
      query: (queryParams) => queries.getFilterJob.query(queryParams),
      invalidatesTags: ["GetFilterJob"],
    }),
    getJobUserById: builder.mutation<any, string>({
      query: (queryParams) => queries.getJobUserById.query(queryParams),
      invalidatesTags: ["GetJobUserById"],
    }),
    getSettingData: builder.query<SettingResponse, void>({
      query: queries.getSetting.query,
      providesTags: ["Setting"],
    }),
    getSettings: builder.query<SettingResponse, void>({
      query: queries.getSettings.query,
      providesTags: ["Settings"],
    }),
    deleteAppliedJob: builder.mutation<any, string>({
      query: (jobId) => queries.deleteAppliedJob.query(jobId),
      invalidatesTags: ["DeleteAppliedJobs"],
    }),

    getBannerData: builder.query<BannerResponse, void>({
      query: queries.getBanner.query,
      providesTags: ["Banner"],
    }),
    getCommentForQuetion: builder.mutation<any, any>({
      query: (questionId) => queries.getCommentForQuetion.query(questionId),
      invalidatesTags: ["GetCommentForQuetion"],
    }),
    deleteCommentById: builder.mutation<any, {id:any}>({
      query: (commentId) => queries.deleteCommentById.query(commentId),
      invalidatesTags: ["DeleteCommentById"],
    }),
    deleteBlogCommentById : builder.mutation<any, {id :any}>({
     query : (commentId) => queries.deleteBlogCommentById.query(commentId),
     invalidatesTags : ["DeleteBlogComment"]
    }),
    getCommentForParentComment: builder.mutation<
      any,
      { questionId: any; commentId: any }
    >({
      query: ({ questionId, commentId }) =>
        queries.getCommentForParentComment.query(questionId, commentId),
      invalidatesTags: ["GetCommentForParentComment"],
    }),
    createComment: builder.mutation<any, CreateCommentType>({
      query: (data) => queries.createComment.query(data),
      invalidatesTags: ["CreateComment"],
    }),
    getBanner: builder.query<any, void>({
      query: queries.getBanner.query,
      providesTags: ["Banner"],
    }),
    postSaveContact: builder.mutation<SaveContactDataResponse, SaveContactData>(
      {
        query: (data) => queries.postSaveContact.query(data),
        invalidatesTags: ["SaveContacts"],
      }
    ),
    getService: builder.query<WritableServiceResponse, void>({
      query: queries.getService.query,
      providesTags: ["Service"],
    }),
    getSingleService: builder.mutation<WritableServiceResponse, string>({
      query: (title) => queries.getSingleService.query(title),
      invalidatesTags: ["SingleService"],
    }),
    getReferralTerms: builder.query<WritableReferralResponse, void>({
      query: queries.getReferralTerms.query,
      providesTags: ["ReferralTerms"],
    }),
    getSupport: builder.query<WritableSupportResponse, void>({
      query: queries.getSupport.query,
      providesTags: ["Support"],
    }),
    getRefundPolicy: builder.query<WritableRefundPolicyResponse, void>({
      query: queries.getRefundPolicy.query,
      providesTags: ["RefundPolicy"],
    }),
    getGrievances: builder.query<WritableRefundPolicyResponse, void>({
      query: queries.getGrievances.query,
      providesTags: ["Grievances"],
    }),
    createSingleBlogComment: builder.mutation<
      any,
      WritableSingleBlogCommentPost
    >({
      query: (data) => queries.createSingleBlogComment.query(data),
      invalidatesTags: ["SingleBlogComment"],
    }),
    getSingleBlogCommentbyQuetionId: builder.mutation<any, number>({
      query: (id) => queries.getSingleBlogCommentbyQuetionId.query(id),
      invalidatesTags: ["SingleBlogCommentById"],
    }),
    getSingleParentBlogCommentbyId: builder.mutation<
      any,
      { questionId: any; commentId: any }
    >({
      query: ({ questionId, commentId }) =>
        queries.getSingleParentBlogCommentbyId.query(questionId, commentId),
      invalidatesTags: ["SingleParentBlogCommentById"],
    }),
    getCategoryJobs : builder.query<any, void>({
      query: queries.getCategoryJobs.query,
      providesTags: ["CategoryJobs"],
    }),
    getRecentBlogs : builder.query<any, void>({
      query: queries.getRecentBlogs.query,
      providesTags: ["RecentBlogs"],
    }),
    getCategoryJobById : builder.mutation<any, {id:any}>({
      query: (id) => queries.getCategoryJobById.query(id),
      invalidatesTags: ["CategoryJobById"],
    }),
    createAccount : builder.query<any, void>({
      query: queries.createAccount.query,
      providesTags: ["CreateAccount"],
    }),
    getCounts : builder.query<any, void>({
      query: queries.getCounts.query,
      providesTags: ["Counts"],
    }),
    addLikeDiscussion :builder.mutation<any, {discussion_id:any}>({
     query :(id) => queries.addLikeDiscussion.query(id),
      invalidatesTags: ["AddLikeDiscussion"],
    }),
    createDiscussion : builder.mutation<any,any>({
      query : (data) => queries.createDiscussion.query(data),
      invalidatesTags: ["CreateDiscussion"],
    }),
    deleteDiscussion : builder.mutation<any,any>({
      query :(id) => queries.deleteDiscussion.query(id),
      invalidatesTags: ["DeleteDiscussion"],
    }),
    updateDiscussion : builder.mutation<any,any>({
      query : (data) => queries.updateDiscussion.query(data),
      invalidatesTags: ["UpdateDiscussion"],
    }),
    userListDiscussion : builder.query<any, any>({
      query : queries.userlistDiscussion.query,
      providesTags: ["UserlistDiscussion"],
    }),
    recentJobSeekerJob :builder.query<any,any>({
      query : queries.recentJobSeekerJob.query,
      providesTags: ["RecentJobSeekerJob"],
    }),
    myTransactions : builder.query<any,any>({
      query : queries.myTransactions.query,
      providesTags: ["MyTransactions"],
    }),
    updateDiscussionComment : builder.mutation<any,any>({
      query :(data) => queries.updateDiscussionComment.query(data),
      invalidatesTags: ["UpdateDiscussionComment"],
    }),
    getExperience : builder.query<any,any>({
      query : queries.getExperience.query,
      providesTags: ["GetExperience"],  
    }),
    getCvDownload : builder.query<any,any>({
   query : queries.getCvDownload.query,
    providesTags :["CvDownload"]
    }),
    getCommunity : builder.mutation<any,any>({
      query : (data) => queries.getCommunity.query(data),
      invalidatesTags:["GetCommunity"]
    }),
    getProfileData : builder.query<any,any>({
      query : queries.getProfileData.query,
      providesTags : ["GetProfileData"]
    }),
    getHomeBanner : builder.query<any,any>({
      query : queries.getHomeBanner.query,
      providesTags : ["GetHomeBanner"]
    }),
    whyChooseUs : builder.query<any,any>({
      query : queries.whyChooseUs.query,
      providesTags :["WhyChooseUs"]
    }),
    addScreenShot : builder.mutation<any,any>({
      query : (data)=> queries.addScreenShot.query(data),
      invalidatesTags :["AddScreenShot"]
    }),
    getSubscription : builder.query<any,any>({
      query : queries.getSubscription.query,
      providesTags :["GetSubscription"]
    }),
    getBilling : builder.query<any,any>({
      query : queries.getBilling.query,
      providesTags :["GetBilling"]
    }),
    makeUserPrivate :builder.query<any,any>({
      query : queries.makeUserPrivate.query,
      providesTags :["MakeUserPrivate"]
    }),
    makeUserPublic : builder.query<any,any>({
      query : queries.makeUserPublic.query,
      providesTags :["MakeUserPublic"]
    }),
    makeUserActivate : builder.query<any,any>({
      query :queries.makeUserActivate.query,
      providesTags :["MakeUserActivate"]
    }),
    makeUserDeactivate : builder.query<any,any>({
      query : queries.makeUserDeactivate.query,
      providesTags :["MakeUserDeactivate"]
    }),
    getFeedback : builder.query<any,any>({
      query : queries.getFeedback.query,
      providesTags :["GetFeedback"]
    }),
    saveFeedback : builder.mutation<any,any>({
      query : (data) => queries.saveFeedback.query(data),
      invalidatesTags :["SaveFeedback"]
    }),
    deleteUser : builder.query<any,any>({
      query : queries.deleteUser.query,
      providesTags :["DeleteUser"]
    }),
    getJobTitleSuggestion : builder.mutation<any,any>({
      query : (data)=> queries.getJobTitleSuggestion.query(data),
      invalidatesTags :["GetJobTitleSuggestion"]

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
  useGetSettingDataQuery,
  useGetCategoriesQuery,
  useGetSingleDiscussionByTitleMutation,
  useGetSingleEventByTitleMutation,
  useGetFilterJobMutation,
  useBuyPassForEventMutation,
  useGetJobUserByIdMutation,
  useGetCtcDataByIdMutation,
  useDeleteAppliedJobMutation,
  useDeleteCommentByIdMutation,
  useGetCommentForParentCommentMutation,
  useGetCommentForQuetionMutation,
  useCreateCommentMutation,
  useGetUpComingEventsQuery,
  useGetPastEventsQuery,
  useGetSettingsQuery,
  useGetBannerQuery,
  usePostSaveContactMutation,
  useGetServiceQuery,
  useGetSingleServiceMutation,
  useGetReferralTermsQuery,
  useGetSupportQuery,
  useGetRefundPolicyQuery,
  useGetCtcTextQuery,
  useGetEventTextQuery,
  useGetGrievancesQuery,
  useCreateSingleBlogCommentMutation,
  useGetSingleBlogCommentbyQuetionIdMutation,
  useGetSingleParentBlogCommentbyIdMutation,
  useGetCategoryJobsQuery,
  useGetRecentBlogsQuery,
  useGetCategoryJobByIdMutation,
  useCreateAccountQuery,
  useGetCountsQuery,
  useAddLikeDiscussionMutation,
  useDeleteBlogCommentByIdMutation,
  useUpdateBlogCommentMutation,
  useCreateDiscussionMutation,
  useDeleteDiscussionMutation,
  useUpdateDiscussionMutation,
  useUserListDiscussionQuery,
  useRecentJobSeekerJobQuery,
  useMyTransactionsQuery,
  useUpdateDiscussionCommentMutation,
  useGetExperienceQuery,
  useGetCvDownloadQuery,
  useGetCommunityMutation,
  useGetProfileDataQuery,
  useGetHomeBannerQuery,
  useWhyChooseUsQuery,
  useAddScreenShotMutation,
  useMakeUserActivateQuery,
  useMakeUserDeactivateQuery,
  useMakeUserPrivateQuery,
  useMakeUserPublicQuery,
  useGetFeedbackQuery,
  useSaveFeedbackMutation,
  useDeleteUserQuery,
  useGetBillingQuery,
  useGetSubscriptionQuery,
  useGetJobTitleSuggestionMutation
} = globalApi;
export default globalApi;
