import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./job-seeker.api";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["PostProfile"],
});

const jobSeekerApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    postProfile: builder.mutation<any, FormData>({
      query: (data) => queries.postProfile.query(data),
      invalidatesTags: ["PostProfile"],
    }),
  }),
});

export const { usePostProfileMutation } = jobSeekerApiSlice;
export default jobSeekerApiSlice;
