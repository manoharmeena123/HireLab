import {
  ApplyJobData,
  Filters,
  SaveJobData,
  WritableBuyPassData,
  CreateCommentType,
  SaveContactData,
  WritableSingleBlogCommentPost,
} from "@/types/index";
import { query } from "firebase/firestore";
import { url } from "inspector";

export const queries = {
  getBlogs: {
    query: () => ({
      url: "api/blogs",
      method: "GET",
    }),
  },
  getBlogsById: {
    query: (id: string) => ({
      url: `api/blog/${id}`,
      method: "GET",
    }),
  },
  updateBlogComment :{
    query :(data :any)=>({
      url :`api/update-blog-comment`,
      method :"POST",
      body :data
    })
  },
  getEvents: {
    query: () => ({
      url: "api/upcoming-events",
      method: "GET",
    }),
  },
  getSector: {
    query: () => ({
      url: "api/get-sector",
      method: "GET",
    }),
  },
  getRecentJobs: {
    query: () => ({
      url: "api/recent-jobs",
      method: "GET",
    }),
  },
  getAppliedJobs: {
    query: () => ({
      url: "api/get-applied-job",
      method: "GET",
    }),
  },
  getCtcData: {
    query: () => ({
      url: "api/get-ctc",
      method: "GET",
    }),
  },
  getCtcDataById: {
    query: (id: string) => ({
      url: `api/get-ctc-base-job/${id}`,
      method: "GET",
    }),
  },
  getCtcText: {
    query: () => ({
      url: `api/page/ctc`,
      method: "GET",
    }),
  },
  getCollage: {
    query: () => ({
      url: "api/get-college",
      method: "GET",
    }),
  },
  getIndustry: {
    query: () => ({
      url: "api/get-industry",
      method: "GET",
    }),
  },
  getDiscussion: {
    query: () => ({
      url: "api/get-global-discussions",
      method: "GET",
    }),
  },
  userlistDiscussion :{
    query: () => ({
      url :`api/list-discussions`,
      method : "GET",
    })
  },
  getJobs: {
    query: () => ({
      url: "api/get-jobs",
      method: "GET",
    }),
  },
  getJobById: {
    query: (id: string) => ({
      url: `api/job/${id}`,
      method: "GET",
    }),
  },
  getTestimonials: {
    query: () => ({
      url: "api/get-testimonials",
      method: "GET",
    }),
  },
  getSavedJob: {
    query: () => ({
      url: "api/get-saved-job",
      method: "GET",
    }),
  },
  deleteSavedJob: {
    query: (id: string) => ({
      url: `api/delete-saved-job/${id}`,
      method: "GET",
    }),
  },
  getEducations: {
    query: () => ({
      url: "api/get-educations",
      method: "GET",
    }),
  },
  getLocations: {
    query: () => ({
      url: "api/get-locations",
    }),
  },
  getTags: {
    query: () => ({
      url: "api/get-tags",
      method: "GET",
    }),
  },
  getJobType: {
    query: () => ({
      url: "api/get-job-types",
      method: "GET",
    }),
  },
  getCompensations: {
    query: () => ({
      url: "api/get-compensations",
      method: "GET",
    }),
  },
  getMembership: {
    query: () => ({
      url: "api/get-membership-plan",
      method: "GET",
    }),
  },
  getAdditionalPerk: {
    query: () => ({
      url: "api/get-additonal-perks",
      method: "GET",
    }),
  },
  getTier: {
    query: () => ({
      url: "api/get-tiers",
      method: "GET",
    }),
  },
  getDesignation: {
    query: () => ({
      url: "api/get-designations",
      method: "GET",
    }),
  },
  getSetting: {
    query: () => ({
      url: "api/get-setting",
      method: "GET",
    }),
  },
  getCategories: {
    query: () => ({
      url: "api/get-categories",
      method: "GET",
    }),
  },
  getEventText: {
    query: () => ({
      url: `api/page/Meetups-and-Events`,
      method: "GET",
    }),
  },
  getUpComingEvents: {
    query: () => ({
      url: "/api/upcoming-events",
      method: "GET",
    }),
  },
  getPastEvents: {
    query: () => ({
      url: "/api/past-events",
      method: "GET",
    }),
  },
  getSingleEventByTitle: {
    query: (title: string) => ({
      url: `api/event/${title}`,
      method: "GET",
    }),
  },
  getSingleDiscussionByTitle: {
    query: (title: string) => ({
      url: `api/discussion/${title}`,
      method: "GET",
    }),
  },
  getFilterJob: {
    query: (queryParams: Filters) => {
      const stringifiedParams = Object.keys(queryParams).reduce((acc, key) => {
        acc[key] = String(queryParams[key]);
        return acc;
      }, {} as Record<string, string>);

      return {
        url: `api/filter-jobs?${new URLSearchParams(
          stringifiedParams
        ).toString()}`,
        method: "GET",
      };
    },
  },
  getJobUserById: {
    query: (id: string) => ({
      url: `api/get-job-users/${id}`,
      method: "GET",
    }),
  },
  deleteAppliedJob: {
    query: (id: string) => ({
      url: `api/delete-applied-job/${id}`,
      method: "GET",
    }),
  },
  getCommentForQuetion: {
    query: (id: any) => ({
      url: `api/get-comments-for-question/${id}`,
      method: "GET",
    }),
  },
  getCommentForParentComment: {
    query: (quetionId: any, commentId: any) => ({
      url: `api/get-comments-for-parent-comment/${quetionId}/${commentId}`,
      method: "GET",
    }),
  },
  deleteCommentById: {
    query: (id: any) => ({
      url: `api/delete-comment/${id}`,
      method: "GET",
    }),
  },
  deleteBlogCommentById: {
    query: (id: any) => ({
      url: `api/delete-blog-comment/${id}`,
      method: "GET",
    }),
  },
  getSettings: {
    query: () => ({
      url: "api/get-setting",
      method: "GET",
    }),
  },

  getBanner: {
    query: () => ({
      url: `/api/page/banner`,
      method: "GET",
    }),
  },

  getService: {
    query: () => ({
      url: `api/services`,
      method: "GET",
    }),
  },
  getSingleService: {
    query: (title: string) => ({
      url: `api/services/${title}`,
      method: "GET",
    }),
  },

  //api/page/referral-terms

  getReferralTerms: {
    query: () => ({
      url: `/api/page/referral-terms`,
      method: "GET",
    }),
  },

  // api/page/support
  getSupport: {
    query: () => ({
      url: `/api/page/support`,
      method: "GET",
    }),
  },

  //api/page/refund-policy
  getRefundPolicy: {
    query: () => ({
      url: `/api/page/refund-policy`,
      method: "GET",
    }),
  },
  //api/page/grievances
  getGrievances: {
    query: () => ({
      url: `/api/page/grievances`,
      method: "GET",
    }),
  },

  //api/get-blog-category
  getCategoryJobs: {
    query: () => ({
      url: "api/get-blog-category",
      method: "GET",
    }),
  },
  ///api/recent-blogs
  getRecentBlogs: {
    query: () => ({
      url: "api/recent-blogs",
      method: "GET",
    }),
  },
  // api/page/create-account
  createAccount: {
    query: () => ({
      url: "api/page/create-account",
      method: "GET",
    }),
  },
  getCounts: {
    query: () => ({
      url: "api/get-counts",
      method: "GET",
    }),
  },
  recentJobSeekerJob :{
    query :()=>({
      url :"api/recent-jobs-for-job-seeker",
      method : "GET"
    })
  },
  myTransactions :{
    query :() => ({
      url :"api/my-transcations",
      method :"GET"
    })
  },
  getExperience :{
    query :() =>({
      url :'api/get-experiences',
      method :"GET"
    })
  },
  getCvDownload :{
    query :()=>({
      url :'api/get-my-cv',
      method :"GET"
    })
  },
  getCommunity :{
    query :(query :any)=>({
      url : `api/community/${query}`
    })
  },
  getProfileData :{
    query :() =>({
      url : `api/logged-user1`
    })
  },
  getHomeBanner :{
    query :() =>({
      url :"api/page/home-banner"
    })
  },
  whyChooseUs :{
    query :()=>({
      url :"api/page/why-choose-us"
    })
  },
  //Post===================================================================================>

  buyPassForEvent: {
    query: (data: WritableBuyPassData) => ({
      url: "api/buy-pass",
      method: "POST",
      body: data,
    }),
  },

  postApplyJob: {
    query: (id: ApplyJobData) => ({
      url: "api/apply-job",
      method: "POST",
      body: id,
    }),
  },
  postSaveJob: {
    query: (id: SaveJobData) => ({
      url: "api/saved-job",
      method: "POST",
      body: id,
    }),
  },
  createComment: {
    query: (commentData: CreateCommentType) => ({
      url: "api/create-comment",
      method: "POST",
      body: commentData,
    }),
  },

  postSaveContact: {
    query: (data: SaveContactData) => ({
      url: "api/save-contact",
      method: "POST",
      body: data,
    }),
  },
  ///api/create-blog-comment
  createSingleBlogComment: {
    query: (data: WritableSingleBlogCommentPost) => ({
      url: `api/create-blog-comment`,
      method: "POST",
      body: data,
    }),
  },
  ///api/get-blog-comments-for-question/
  getSingleBlogCommentbyQuetionId: {
    query: (id: number) => ({
      url: `api/get-blog-comments-for-question/${id}`,
      method: "GET",
    }),
  },

  //api/get-blog-comments-for-parent-comment/16/24
  getSingleParentBlogCommentbyId: {
    query: (questionId: any, commentId: any) => ({
      url: `api/get-blog-comments-for-parent-comment/${questionId}/${commentId}`,
      method: "GET",
    }),
  },
  // api/get-blogs-by-category/15
  getCategoryJobById: {
    query: (id: any) => ({
      url: `api/get-blogs-by-category/${id}`,
      method: "GET",
    }),
  },
  // api/like-discussion
  addLikeDiscussion: {
    query: (discussion_id: any) => ({
      url: "api/like-discussion",
      method: "POST",
      body: discussion_id,
    }),
  },
  createDiscussion :{
    query :(payload :any)=>({
      url: "api/create-discussion",
      method: "POST",
      body: payload   
    })
  },
  deleteDiscussion :{
    query :(id : any)=>({
      url: `api/delete-discussion/${id}`,
      method: "GET",
    })
  },
  updateDiscussion :{
    query :(data :any)=>({
      url :"api/update-discussion",
      method :'POST',
      body :data
    })
  },
  updateDiscussionComment :{
    query :(data :any)=>({
      url : "api/update-comment",
      method :"POST",
      body : data
    })
  },
  addScreenShot : {
    query : (data :any) =>({
      url : "api/add-job-screenshot",
      method : "POST",
      body : data
    })
  }
};
