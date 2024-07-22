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
  WritableEducationDataResponse,
  WritableProjectData,
  WritableProjectDataResponse,
  WritableProfileSummaryData,
  WritableProfileSummaryDataResponse,
  WritablePersonalDetails,
  WritablePersonalDetailsResponse,
  WritableCareerProfileData,
  WritableCareerProfileDataResponse,
  WritableResumeItSkill,
  WritableResumeItSkillResponse,
} from "../types/resume";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ["Resume"],
});

const resumeApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumeData: builder.query<WritableResumeFetchResponse, void>({
      query: queries.getResumeData.query,
      providesTags: ["Resume"],
    }),
    createResumeHeadline: builder.mutation<
      WritableHeadlineDataResponse,
      WritableHeadlineData
    >({
      query: (data) => queries.createResumeHeadline.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumeHeadline: builder.mutation<
      WritableHeadlineDataResponse,
      { data: WritableHeadlineData; headline_id: number }
    >({
      query: ({ data, headline_id }) =>
        queries.updateResumeHeadline.query(data, headline_id),
      invalidatesTags: ["Resume"],
    }),
    createKeySkill: builder.mutation<
      WritableKeySkillDataResponse,
      WritableKeySkillData
    >({
      query: (data) => queries.createKeySkill.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateKeySkill: builder.mutation<
      WritableKeySkillDataResponse,
      { data: WritableKeySkillData; key_skill_id: number }
    >({
      query: ({ data, key_skill_id }) =>
        queries.updateKeySkill.query(data, key_skill_id),
      invalidatesTags: ["Resume"],
    }),
    createResumeEmployment: builder.mutation<
      WritableEmploymentDataResponse,
      WritableEmploymentData
    >({
      query: (data) => queries.createResumeEmployment.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumeEmployment: builder.mutation<
      WritableEmploymentDataResponse,
      { data: WritableEmploymentData; employment_id: number }
    >({
      query: ({ data, employment_id }) =>
        queries.updateResumeEmployment.query(data, employment_id),
      invalidatesTags: ["Resume"],
    }),
    createEducation: builder.mutation<
      WritableEducationDataResponse,
      WritableEducationData
    >({
      query: (data) => queries.createEducation.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateEducation: builder.mutation<
      WritableEducationDataResponse,
      { data: WritableEducationData; education_id: number }
    >({
      query: ({ data, education_id }) =>
        queries.updateEducation.query(data, education_id),
      invalidatesTags: ["Resume"],
    }),
    createResumeProject: builder.mutation<
      WritableProjectDataResponse,
      WritableProjectData
    >({
      query: (data) => queries.createResumeProject.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumeProject: builder.mutation<
      WritableProjectDataResponse,
      { data: WritableProjectData; project_id: number }
    >({
      query: ({ data, project_id }) =>
        queries.updateResumeProject.query(data, project_id),
      invalidatesTags: ["Resume"],
    }),
    createProfileSummary: builder.mutation<
      WritableProfileSummaryDataResponse,
      WritableProfileSummaryData
    >({
      query: queries.createProfileSummary.query,
      invalidatesTags: ["Resume"],
    }),
    updateProfileSummary: builder.mutation<
      WritableProfileSummaryDataResponse,
      { data: WritableProfileSummaryData; profile_summary_id: number }
    >({
      query: ({ data, profile_summary_id }) =>
        queries.updateProfileSummary.query(data, profile_summary_id),
      invalidatesTags: ["Resume"],
    }),
    createResumePersonalDetails: builder.mutation<
      WritablePersonalDetailsResponse,
      WritablePersonalDetails
    >({
      query: (data) => queries.createResumePersonalDetails.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumePersonalDetails: builder.mutation<
      WritablePersonalDetailsResponse,
      { data: WritablePersonalDetails; personal_detail_id: number }
    >({
      query: ({ data, personal_detail_id }) =>
        queries.updateResumePersonalDetails.query(data, personal_detail_id),
      invalidatesTags: ["Resume"],
    }),
    createCareerProfile: builder.mutation<
      WritableCareerProfileDataResponse,
      WritableCareerProfileData
    >({
      query: (data) => queries.createCareerProfile.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateCareerProfile: builder.mutation<
      WritableCareerProfileDataResponse,
      { data: WritableCareerProfileData; career_profile_id: number }
    >({
      query: ({ data, career_profile_id }) =>
        queries.updateCareerProfile.query(data, career_profile_id),
      invalidatesTags: ["Resume"],
    }),
    createResumeItSkills: builder.mutation<
      WritableResumeItSkillResponse,
      WritableResumeItSkill
    >({
      query: (data) => queries.createResumeItSkills.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumeItSkills: builder.mutation<
      WritableResumeItSkillResponse,
      { data: WritableResumeItSkill; it_skill_id: number }
    >({
      query: ({ data, it_skill_id }) =>
        queries.updateResumeItSkills.query(data, it_skill_id),
      invalidatesTags: ["Resume"],
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
  useCreateResumeProjectMutation,
  useUpdateResumeProjectMutation,
  useCreateProfileSummaryMutation,
  useUpdateProfileSummaryMutation,
  useCreateResumePersonalDetailsMutation,
  useUpdateResumePersonalDetailsMutation,
  useCreateCareerProfileMutation,
  useUpdateCareerProfileMutation,
  useCreateResumeItSkillsMutation,
  useUpdateResumeItSkillsMutation,
} = resumeApi;

export default resumeApi;
