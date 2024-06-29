import { BlogResponse } from "@/types/blog";

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
  getEvents :{
    query :()=>({
      url : "api/get-events",
      method : "GET"
    })
  },
  getSector :{
    query : ()=>({
      url : "api/get-sector",
      method : "GET"
    })
  },
  getRecentJobs :{
    query : ()=>({
      url : "api/recent-jobs",
      method : "GET"
    })
  }
};
