import {
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
} from "../types/resume";

// Resume =============================================================================================>
export const queries = {
  // Complete resume data
  getResumeData: {
    query: () => ({
      url: "api/my-resume",
      method: "GET",
    }),
  },
  // /api/create-resume-headline
  createResumeHeadline: {
    query: (HeadlineData: WritableHeadlineData) => ({
      url: "api/create-resume-headline",
      method: "POST",
      body: HeadlineData,
    }),
  },
  updateResumeHeadline: {
    query: (data: WritableHeadlineData, headline_id: number) => ({
      url: `api/update-resume-headline`,
      method: "POST",
      body: { headline_id, ...data },
    }),
  },
  // /api/create-resume-key-skill
  createKeySkill: {
    query: (data: WritableKeySkillData) => ({
      url: "api/create-resume-key-skill",
      method: "POST",
      body: data,
    }),
  },
  updateKeySkill: {
    query: (data: WritableKeySkillData, key_skill_id: number) => ({
      url: `api/update-resume-key-skill`,
      method: "POST",
      body: { key_skill_id, title: data.title },
    }),
  },

  //api/create-resume-employment

  createResumeEmployment: {
    query: (data: WritableEmploymentData) => ({
      url: "api/create-resume-employment",
      method: "POST",
      body: data,
    }),
  },

  updateResumeEmployment: {
    query: (data: WritableEmploymentData, employment_id: number) => ({
      url: `api/update-resume-employment`,
      method: "POST",
      body: { employment_id, ...data },
    }),
  },

  // /api/create-resume-education

  createEducation: {
    query: (data: WritableEducationData) => ({
      url: "api/create-resume-education",
      method: "POST",
      body: data,
    }),
  },
  updateEducation: {
    query: (data: WritableEducationData, education_id: number) => ({
      url: `api/update-resume-education`,
      method: "POST",
      body: { education_id, ...data },
    }),
  },

  // /api/create-resume-projects
  createResumeProject: {
    query: (data: WritableProjectData) => ({
      url: "api/create-resume-projects",
      method: "POST",
      body: data,
    }),
  },
  updateResumeProject: {
    query: (data: WritableProjectData, project_id: number) => ({
      url: `api/update-resume-projects`,
      method: "POST",
      body: { project_id, ...data },
    }),
  },

  //api/create-resume-profile-summary

  createProfileSummary: {
    query: (data: WritableProfileSummaryData) => ({
      url: "api/create-resume-profile-summary",
      method: "POST",
      body: data,
    }),
  },
  updateProfileSummary: {
    query: (data: WritableProfileSummaryData, profile_summary_id: number) => ({
      url: `api/update-resume-profile-summary`,
      method: "POST",
      body: { profile_summary_id, ...data },
    }),
  },

  // api/create-resume-personal-detail

  createResumePersonalDetails: {
    query: (data: WritablePersonalDetails) => ({
      url: "api/create-resume-personal-detail",
      method: "POST",
      body: data,
    }),
  },
  updateResumePersonalDetails: {
    query: (data: WritablePersonalDetails, personal_detail_id: number) => ({
      url: `api/update-resume-personal-detail`,
      method: "POST",
      body: { personal_detail_id, ...data },
    }),
  },

  ///api/create-resume-career-profile

  createCareerProfile: {
    query: (data: WritableCareerProfileData) => ({
      url: "api/create-resume-career-profile",
      method: "POST",
      body: data,
    }),
  },

  updateCareerProfile: {
    query: (data: WritableCareerProfileData, career_profile_id: number) => ({
      url: `api/update-resume-career-profile`,
      method: "POST",
      body: { career_profile_id, ...data },
    }),
  },
};
