// src/app/post-job/store/post-job.query.ts

import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./post-job.api";
import { PostJobType, PostJobResponse, UpdatePostJobType } from "../types";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["PostJob", "UpdateJob"],
});

const postJobApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation<PostJobResponse, PostJobType>({
      query: (profileData) => queries.postJob.query(profileData),
      invalidatesTags: ["PostJob"],
    }),
    updateJob: builder.mutation<PostJobResponse, any>({
      query: (updatedData) => queries.updateJob.query(updatedData),
      invalidatesTags: ["UpdateJob"],
    }),
  }),
});

export const { usePostJobMutation, useUpdateJobMutation } = postJobApiSlice;
export default postJobApiSlice;
