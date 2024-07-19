import { WritableDraft } from "immer";



// Resume Headline
 interface HeadlineData {
  description: string;
}

export interface HeadlineDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: HeadlineData[];
}

// Resume Key Skill

interface KeySkillData {
title :string
}
interface KeySkillDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: KeySkillData[];

}


//my-resume

export interface ResumeFetchResponse {
  code: number;
  success: boolean;
  message: string;
  data: ResumeData[];
}

export interface ResumeData {
  id: number;
  headline_id: number | null;
  created_at: string;
  updated_at: string;
  key_skill_id: number | null;
  employment_id: number | null;
  education_id: number | null;
  it_skill_id: number | null;
  project_id: number | null;
  user_id: number;
  profile_summary_id: number | null;
  headlines: Headline[];
  key_skills: any[]; // Adjust the type as needed
  employments: any[]; // Adjust the type as needed
  educations: any[]; // Adjust the type as needed
  it_skills: any[]; // Adjust the type as needed
  projects: any[]; // Adjust the type as needed
  profile_summaries: any[]; // Adjust the type as needed
  accomplishments: any[]; // Adjust the type as needed
  career_profiles: any[]; // Adjust the type as needed
  personal_details: any[]; // Adjust the type as needed
  files: any[]; // Adjust the type as needed
}

export interface Headline {
  id: number;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: {
    resume_id: number;
    headline_id: number;
  };
}


//Employment


interface EmploymentData {
  designation: string;
  organization: string;
  current_company: "yes" | "no";
  start_from_year: string;
  start_from_month: string;
  worked_till_year?: string;
  worked_till_month?: string;
  describe_job_profile: string;
}


interface EmploymentDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: EmploymentData[];

}


// education

interface EducationData {
  title: string;
  year: string;
  description: string;
  education: string;
  course: string;
  university: string;
}
interface EducationDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: WritableEducationData[];

}


// project
interface ProjectData {
  title: string;
  project_employment: string;
  client: string;
  project_status: string;
  start_from_year: string;
  start_from_month: string;
  worked_till_year: string;
  worked_till_month: string;
  detail_of_project: string;
}

interface ProjectDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: ProjectData[];

}


type WritableResumeFetchResponse = WritableDraft<ResumeFetchResponse>;
type WritableHeadlineData = WritableDraft<HeadlineData>;
type WritableHeadlineDataResponse = WritableDraft<HeadlineDataResponse>;
type WritableKeySkillData = WritableDraft<KeySkillData>;
type WritableKeySkillDataResponse = WritableDraft<KeySkillDataResponse>;
type WritableEmploymentData= WritableDraft<EmploymentData>;
type WritableEmploymentDataResponse= WritableDraft<EmploymentDataResponse>;
type WritableEducationData= WritableDraft<EducationData>;
type WritableEducationDataResponse= WritableDraft<EducationDataResponse>;
type WritableProjectData= WritableDraft<ProjectData>;
type WritableProjectDataResponse= WritableDraft<ProjectDataResponse>;

export {
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
  WritableProjectDataResponse
}