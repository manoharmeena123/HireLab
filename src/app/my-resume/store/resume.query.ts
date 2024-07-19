import { queries } from "./resume.api";
import { hirelabApiSlice } from "@/rtk/base-query";
import {
  WritableResumeFetchResponse,
  WritableHeadlineData,
  WritableHeadlineDataResponse,
  WritableKeySkillData,
  WritableKeySkillDataResponse,
  WritableEmploymentData,
  WritableEmploymentDataResponse,
  WritableEducationData,
  WritableEducationDataResponse
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
    createResumeEmployment : builder.mutation<WritableEmploymentDataResponse,WritableEmploymentData>({
     query: (data) => queries.createResumeEmployment.query(data),
     invalidatesTags: ['Resume'],
    }),
    updateResumeEmployment : builder.mutation<WritableEmploymentDataResponse, { data: WritableEmploymentData, employment_id: number }>({
     query: ({ data, employment_id }) => queries.updateResumeEmployment.query(data, employment_id),
     invalidatesTags: ['Resume'],
    }),
    createEducation : builder.mutation<WritableEducationDataResponse, WritableEducationData>({ 
      query: (data) => queries.createEducation.query(data),
      invalidatesTags: ['Resume'],
    }),
    updateEducation : builder.mutation<WritableEducationDataResponse, { data: WritableEducationData, education_id: number }>({ 
      query: ({ data, education_id }) => queries.updateEducation.query(data, education_id),
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
  useCreateResumeEmploymentMutation,
  useUpdateResumeEmploymentMutation,
  useCreateEducationMutation,
  useUpdateEducationMutation,
} = resumeApi;

export default resumeApi;
