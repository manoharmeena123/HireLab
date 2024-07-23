export interface JobData {
  id: number;
  company_name: string;
  job_type: {
    title: string;
  };
  job_category: string | null;
  experience: {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  job_description: string;
  location: {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
  user_id: number;
  job_title: string;
  address: string;
  compensation: {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  additional_perk: {
    id: number;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  joining_fee: string;
  candidate_requirement: string;
  maximum_education: string;
  total_experience: string;
  education: {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role_id: string | null;
    status: string;
    image: string | null;
    mobile_number: string;
    otp: number;
    is_verify: string;
    company_name: string | null;
    website: string | null;
    founded_date: string | null;
    country_id: string | null;
    category_id: string | null;
    city_id: string | null;
    zip: string | null;
    address: string | null;
    facebook: string | null;
    google: string | null;
    twitter: string | null;
    linkedin: string | null;
    experience: string | null;
    industry_id: string | null;
    expected_ctc: string | null;
    current_ctc: string | null;
    resume: string | null;
    location: string | null;
    country: string | null;
    description: string | null;
    city: string | null;
  };
  applicant_count: string;
  sector: string;
  tags: string;
}

export interface ManageResponse {
  code: number;
  success: boolean;
  message: string;
  data: JobData[][];
}

export type getJobUserData = {
  jobId: string;
};
export interface getJobUserDataResponse {
  code: number;
  success: boolean;
  message: string;
  data: any[];
}
