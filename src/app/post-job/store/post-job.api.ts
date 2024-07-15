// src/app/post-job/store/post-job.api.ts

import { PostJobType,UpdatePostJobType } from "../types";

export const queries = {
  postJob: {
    query: (profileData: PostJobType) => ({
      url: "api/post-job",
      method: "POST",
      body: profileData,
    }),
  },
  updateJob: {
    query: (updatedData: UpdatePostJobType) => ({
      url: "api/update-job",
      method: "POST",
      body: updatedData,
    }),
  },
};
