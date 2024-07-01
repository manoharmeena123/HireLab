import { ApplyJobData, SaveJobData } from "@/types/index";

export const queries = {
  getBlogs: {
    query: () => ({
      url: "api/blogs",
      method: "GET",
    }),
  },
  getBlogsById: {
    query: (id: string) => ({
      url: `api/blogs/${id}`,
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
  deleteSavedJob:{
    query :(id :string) => ({
      url: `api/delete-saved-job/${id}`,
      method: "GET",
    })
  },

  //Post
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
};
