// src/app/post-job/store/post-job.api.ts

import { PostJobType } from "../types";

export const queries = {
  postJob: {
    query: (profileData: PostJobType) => ({
      url: "api/post-job",
      method: "POST",
      body: profileData,
    }),
  },
};
