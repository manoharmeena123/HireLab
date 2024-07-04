import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./job-poster.api";
import { WritableProfileData } from "../types/index";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["UpdateProfile", "PostProfile"],
});

const jobPosterApiSice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, WritableProfileData>({
      query: (data) => queries.updateProfile.query(data),
      invalidatesTags: ["UpdateProfile"],
    }),
    postProfile: builder.mutation<any, any>({
      query: (data) => queries.postProfile.query(data),
      invalidatesTags: ["PostProfile"],
    }),
  }),
});

export const { useUpdateProfileMutation, usePostProfileMutation } = jobPosterApiSice;
export default jobPosterApiSice;
