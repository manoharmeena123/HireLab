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
  WritableCreateResumeFile,
  WritableCreateResumeFileResponse,
  WritableAccomplishmentsData,
  WritableAccomplishmentsResponse,
  WritableProfileResumeResponse,
  WritableJobPosterFAQResponse,
  WritableJobSeekerFAQResponse,
  WritableMonthlyMeetUpFAQResponse,
  WritableGeneralQuetionFAQResponse,
  WritableAboutUsResponse,
  WritablePrivacyPolicyResponse,
  WritableTermsAndConditionResponse,
  WritableServiceResponse,
  WritableRejectJobCandidate,
  WritableRejectJobCandidateResponse,
  WritableAcceptJobCandidate,
  WritableAcceptJobCandidateResponse,
  WritableSaveMemberShip,
  WritableSaveMemberShipResponse,
  WritableSaveEvent,
  WritableSaveEventResponse,
  WritableRemoveEvent,
  WritableRemoveEventResponse,
  WritableResumeDataResponse,
} from "../types/resume";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: [
    "Resume",
    "ResumeProfile",
    "JobPosterFAQ",
    "JobSeekerFAQ",
    "MonthlyMeetFAQ",
    "GeneralQuetionFAQ",
    "AboutUsFAQ",
    "PrivacyPolicy",
    "TermsAndCondition",
    "ServiceSection",
    "RejectJobCandidate",
    "AcceptJobCandidate",
    "SaveMemberShip",
    "SaveEvent",
    "MyEvents",
    "RemoveEvent",
    "CvManager",
  ],
});

const resumeApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumeData: builder.query<any, void>({
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
    createAttachmResumeFile: builder.mutation<
      WritableCreateResumeFileResponse,
      FormData
    >({
      query: (file) => queries.createAttachmResumeFile.query(file),
      invalidatesTags: ["Resume"],
    }),
    updateAttachResumeFile: builder.mutation<
      WritableCreateResumeFileResponse,
      FormData
    >({
      query: (formData) => queries.updateAttachResumeFile.query(formData),
      invalidatesTags: ["Resume"],
    }),
    createResumeAccomplishments: builder.mutation<
      WritableAccomplishmentsResponse,
      WritableAccomplishmentsData
    >({
      query: (data) => queries.createResumeAccomplishments.query(data),
      invalidatesTags: ["Resume"],
    }),
    updateResumeAccomplishments: builder.mutation<
      WritableAccomplishmentsResponse,
      { data: WritableAccomplishmentsData; accomplishment_id: number }
    >({
      query: ({ data, accomplishment_id }) =>
        queries.updateResumeAccomplishments.query(data, accomplishment_id),
      invalidatesTags: ["Resume"],
    }),
    resumeProfileData: builder.query<WritableProfileResumeResponse, void>({
      query: queries.resumeProfileData.query,
      providesTags: ["ResumeProfile"],
    }),
    jobPosterFaq: builder.query<WritableJobPosterFAQResponse, void>({
      query: queries.jobPosterFaq.query,
      providesTags: ["JobPosterFAQ"],
    }),
    jobSeekerFaq: builder.query<WritableJobSeekerFAQResponse, void>({
      query: queries.jobSeekerFaq.query,
      providesTags: ["JobSeekerFAQ"],
    }),
    monthlyMeetFaq: builder.query<WritableMonthlyMeetUpFAQResponse, void>({
      query: queries.monthlyMeetFaq.query,
      providesTags: ["MonthlyMeetFAQ"],
    }),
    generalQuetionFaq: builder.query<WritableGeneralQuetionFAQResponse, void>({
      query: queries.generalQuetionFaq.query,
      providesTags: ["GeneralQuetionFAQ"],
    }),
    aboutUsFaq: builder.query<WritableAboutUsResponse, void>({
      query: queries.aboutUsFaq.query,
      providesTags: ["AboutUsFAQ"],
    }),
    PrivacyPolicy: builder.query<any, void>({
      query: queries.PrivacyPolicy.query,
      providesTags: ["PrivacyPolicy"],
    }),
    termsAndCondition: builder.query<WritableTermsAndConditionResponse, void>({
      query: queries.termsAndCondition.query,
      providesTags: ["TermsAndCondition"],
    }),
    serviceSection: builder.query<WritableServiceResponse, void>({
      query: queries.serviceSection.query,
      providesTags: ["ServiceSection"],
    }),
    rejectJobCandidate: builder.mutation<
      WritableRejectJobCandidateResponse,
      WritableRejectJobCandidate
    >({
      query: (data) => queries.rejectJobCandidate.query(data),
      invalidatesTags: ["RejectJobCandidate"],
    }),
    acceptJobCandidate: builder.mutation<
      WritableAcceptJobCandidateResponse,
      WritableAcceptJobCandidate
    >({
      query: (data) => queries.acceptJobCandidate.query(data),
      invalidatesTags: ["AcceptJobCandidate"],
    }),
    saveMemberShip: builder.mutation<
      WritableSaveMemberShipResponse,
      WritableSaveMemberShip
    >({
      query: (data) => queries.saveMemberShip.query(data),
      invalidatesTags: ["SaveMemberShip"],
    }),
    saveEvent: builder.mutation<WritableSaveEventResponse, WritableSaveEvent>({
      query: (data) => queries.saveEvent.query(data),
      invalidatesTags: ["SaveEvent"],
    }),
    myEvents: builder.query<any, void>({
      query: queries.myEvents.query,
      providesTags: ["MyEvents"],
    }),
    removeEvent: builder.mutation<
      WritableRemoveEventResponse,
      WritableRemoveEvent
    >({
      query: (data) => queries.removeEvent.query(data),
      invalidatesTags: ["RemoveEvent"],
    }),
    getCvManager: builder.query<WritableResumeDataResponse, void>({
      query: queries.getCvManager.query,
      providesTags: ["CvManager"],
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
  useCreateAttachmResumeFileMutation,
  useUpdateAttachResumeFileMutation,
  useCreateResumeAccomplishmentsMutation,
  useUpdateResumeAccomplishmentsMutation,
  useResumeProfileDataQuery,
  useJobPosterFaqQuery,
  useJobSeekerFaqQuery,
  useMonthlyMeetFaqQuery,
  useGeneralQuetionFaqQuery,
  useAboutUsFaqQuery,
  usePrivacyPolicyQuery,
  useTermsAndConditionQuery,
  useServiceSectionQuery,
  useAcceptJobCandidateMutation,
  useRejectJobCandidateMutation,
  useSaveMemberShipMutation,
  useSaveEventMutation,
  useMyEventsQuery,
  useRemoveEventMutation,
  useGetCvManagerQuery,
} = resumeApi;

export default resumeApi;
