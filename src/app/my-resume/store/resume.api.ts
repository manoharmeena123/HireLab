import {
  WritableHeadlineData,
  WritableHeadlineDataResponse,
  WritableKeySkillData,
  WritableKeySkillDataResponse,
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
      body: data ,
    }),
  },
  updateKeySkill: {
    query: (data: WritableKeySkillData, key_skill_id: number) => ({
      url: `api/update-resume-key-skill`,
      method: "POST",
      body: { key_skill_id, title: data.title },
    }),
  },
};
