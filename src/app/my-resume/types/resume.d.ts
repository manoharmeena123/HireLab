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
  title: string;
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

// Profile Summary

interface ProfileSummaryData {
  description: string;
}

interface ProfileSummaryDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: ProfileSummaryData[];
}

//Personal Details

interface PersonalDetails {
  dob: string;
  permanent_address: string;
  gender: string;
  pin_code: string;
  marital_status: string;
  hometown: string;
  passport_number: string;
  work_permit_of_other_country: string;
  differently_abled: string;
  languages: string;
}
interface PersonalDetailsResponse {
  code: number;
  success: boolean;
  message: string;
  data: PersonalDetails[];
}

//Career Profile

interface CareerProfileData {
  career_profile_id?: number;
  industry: string;
  functional_area: string;
  role: string;
  job_type: string;
  employment_type: string;
  desired_shift: string;
  availability_to_join: string;
  expected_salary: string;
  desired_location: string;
  desired_industry: string;
}

interface CareerProfileDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: CareerProfileData[];
}

interface ResumeItSkill {
  it_skill_id?: number;
  skill: string;
  version: string;
  last_used: string;
  experience: string;
  description: string;
}

interface ResumeItSkillResponse {
  code: number;
  success: boolean;
  message: string;
  data: ResumeItSkill[];
}

interface CreateResumeFile {
  file_id?: number;
  file: File;
}

interface CreateResumeFileResponse {
  code: number;
  success: boolean;
  message: string;
  data: CreateResumeFile[];
}

//Accomplishments

interface AccomplishmentsData {
  online_social_profile: string;
  online_social_url: string;
  online_social_description: string;
  work_title: string;
  work_url: string;
  work_duration_from: string;
  work_duration_to: string;
  work_I_am_currently_working_on_this: string;
  work_description: string;
  white_paper_title: string;
  white_paper_url: string;
  white_paper_published_on_year: string;
  white_paper_published_on_month: string;
  white_paper_description: string;
  presentation_title: string;
  presentation_url: string;
  presentation_description: string;
  patent_title: string;
  patent_url: string;
  patent_office: string;
  patent_status: string;
  patent_application_number: string;
  patent_published_on_year: string;
  patent_published_on_month: string;
  patent_description: string;
  certification_name: string;
  certification_body: string;
  certification_year: string;
}

interface AccomplishmentsResponse {
  code: number;
  success: boolean;
  message: string;
  data: AccomplishmentsData[];
}

//resume profile
interface ProfileResumeResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
      resume: boolean;
      profile_strength: number;
  };
}

// job poster FAQ Type
interface JobPosterFAQ {
  id?: number;
  parent_id: number | null;
  question: string;
  answers: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_job_seeker: string;
}

interface JobPosterFAQResponse {
  code: number;
  success: boolean;
  message: string;
  data: JobPosterFAQ[];
}


// job seeket FAQ
interface JobSeekerFAQ {
  id: number;
  parent_id: number | null;
  question: string;
  answers: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_job_seeker: string;
}

interface JobSeekerFAQResponse {
  code: number;
  success: boolean;
  data: JobSeekerFAQ[];
}

// monthly meetup
interface MonthlyMeetUpFAQ {
  id: number;
  parent_id: number | null;
  question: string;
  answers: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_job_seeker: string;
}

interface MonthlyMeetUpFAQResponse {
  code: number;
  success: boolean;
  data: MonthlyMeetUpFAQ[];
}

//general quetion

interface GeneralQuetionFAQ {
  id: number;
  parent_id: number | null;
  question: string;
  answers: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_job_seeker: string;
}

interface GeneralQuetionFAQResponse {
  code: number;
  success: boolean;
  data: GeneralQuetionFAQ[];
}

// about-us
interface AboutUs {
  id: number;
  title: string;
  heading: string;
  description: string;
  image: string;
  bg_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AboutUsResponse {
  code: number;
  success: string;
  message: string;
  data: AboutUs[];
}

//privacy policy
interface PrivacyPolicy {
  id: number;
  title: string;
  heading: string;
  description: string;
  image: string;
  bg_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PrivacyPolicyResponse {
  code: number;
  success: string;
  message: string;
  data: PrivacyPolicy[];
}

// terms and condition

interface TermsAndCondition {
  id: number;
  title: string;
  heading: string;
  description: string;
  image: string;
  bg_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TermsAndConditionResponse {
  code: number;
  success: string;
  message: string;
  data: TermsAndCondition[];
}


//service

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ServiceResponse {
  code: number;
  success: boolean;
  data: Service[];
}

type WritableResumeFetchResponse = WritableDraft<ResumeFetchResponse>;
type WritableHeadlineData = WritableDraft<HeadlineData>;
type WritableHeadlineDataResponse = WritableDraft<HeadlineDataResponse>;
type WritableKeySkillData = WritableDraft<KeySkillData>;
type WritableKeySkillDataResponse = WritableDraft<KeySkillDataResponse>;
type WritableEmploymentData = WritableDraft<EmploymentData>;
type WritableEmploymentDataResponse = WritableDraft<EmploymentDataResponse>;
type WritableEducationData = WritableDraft<EducationData>;
type WritableEducationDataResponse = WritableDraft<EducationDataResponse>;
type WritableProjectData = WritableDraft<ProjectData>;
type WritableProjectDataResponse = WritableDraft<ProjectDataResponse>;
type WritableProfileSummaryData = WritableDraft<ProfileSummaryData>;
type WritableProfileSummaryDataResponse = WritableDraft<ProfileSummaryDataResponse>;
type WritablePersonalDetails = WritableDraft<PersonalDetails>;
type WritablePersonalDetailsResponse = WritableDraft<PersonalDetailsResponse>;
type WritableCareerProfileData = WritableDraft<CareerProfileData>;
type WritableCareerProfileDataResponse = WritableDraft<CareerProfileDataResponse>;
type WritableResumeItSkill = WritableDraft<ResumeItSkill>;
type WritableResumeItSkillResponse = WritableDraft<ResumeItSkillResponse>;
type WritableCreateResumeFile = WritableDraft<CreateResumeFile>;
type WritableCreateResumeFileResponse = WritableDraft<CreateResumeFileResponse>;
type WritableAccomplishmentsData = WritableDraft<AccomplishmentsData>;
type WritableAccomplishmentsResponse = WritableDraft<AccomplishmentsResponse>;


type WritableProfileResumeResponse = WritableDraft<ProfileResumeResponse>;
type WritableJobPosterFAQResponse = WritableDraft<JobPosterFAQResponse>;
type WritableJobSeekerFAQResponse = WritableDraft<JobSeekerFAQResponse>;
type WritableMonthlyMeetUpFAQResponse = WritableDraft<MonthlyMeetUpFAQResponse>;
type WritableGeneralQuetionFAQResponse = WritableDraft<GeneralQuetionFAQResponse>;
type WritableAboutUsResponse = WritableDraft<AboutUsResponse>;
type WritablePrivacyPolicyResponse = WritableDraft<PrivacyPolicyResponse>;
type WritableTermsAndConditionResponse = WritableDraft<TermsAndConditionResponse>;
type WritableServiceResponse = WritableDraft<ServiceResponse>;


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
  WritableServiceResponse
  };
