import { queries } from "./resume.api";
import { hirelabApiSlice } from "@/rtk/base-query";
import {
  WritableResumeFetchResponse,
  WritableHeadlineData,
  WritableHeadlineDataResponse,
  WritableKeySkillData,
  WritableKeySkillDataResponse
} from "../types/resume";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ['Resume'],
});

const resumeApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumeData: builder.query<WritableResumeFetchResponse, void>({
      query: queries.getResumeData.query,
      providesTags: ['Resume'],
    }),
    createResumeHeadline: builder.mutation<WritableHeadlineDataResponse, WritableHeadlineData>({
      query: (data) => queries.createResumeHeadline.query(data),
      invalidatesTags: ['Resume'],
    }),
    updateResumeHeadline: builder.mutation<WritableHeadlineDataResponse, { data: WritableHeadlineData, headline_id: number }>({
      query: ({ data, headline_id }) => queries.updateResumeHeadline.query(data, headline_id),
      invalidatesTags: ['Resume'],
    }),
    createKeySkill: builder.mutation<WritableKeySkillDataResponse, WritableKeySkillData>({
      query: (data) => queries.createKeySkill.query(data),
      invalidatesTags: ['Resume'],
    }),
    updateKeySkill: builder.mutation<WritableKeySkillDataResponse, { data: WritableKeySkillData, key_skill_id: number }>({
      query: ({ data, key_skill_id }) => queries.updateKeySkill.query(data, key_skill_id),
      invalidatesTags: ['Resume'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetResumeDataQuery,
  useCreateResumeHeadlineMutation,
  useUpdateResumeHeadlineMutation,
  useCreateKeySkillMutation,
  useUpdateKeySkillMutation,
} = resumeApi;

export default resumeApi;
