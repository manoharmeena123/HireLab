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
};
