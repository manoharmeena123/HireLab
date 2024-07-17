import {
  ApplyJobData,
  Filters,
  SaveJobData,
  WritableBuyPassData,
  CreateCommentType
} from "@/types/index";

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
  getEvents: {
    query: () => ({
      url: "api/get-events",
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
      url: "api/get-discussions",
      method: "GET",
    }),
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
    query: (id: string) => ({
      url: `api/get-comments-for-question/${id}`,
      method: "GET",
    }),
  },
  getCommentForParentComment: {
    query: (quetionId: string, commentId: string) => ({
      url: `api/get-comments-for-parent-comment/${quetionId}/${commentId}`,
      method: "GET",
    }),
  },
  deleteCommentById: {
    query: (id: string) => ({
      url: `api/delete-comment/${id}`,
      method: "GET",
    }),
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
  createComment :{
    query : (commentData :CreateCommentType)=>({
      url : "api/create-comment",
      method : "POST",
      body : commentData
    })
  }
};
