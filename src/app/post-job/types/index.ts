// src/app/post-job/types/index.ts

export interface PostJobType {
  company_name: string;
  job_title: string;
  job_type: string;
  experience: string;
  location: string;
  address: string;
  compensation: string;
  additional_perk: string;
  joining_fee: string;
  candidate_requirement: string;
  maximum_education: string;
  total_experience: string;
  job_description: string;
  ctc: string;
  city :string;
  state :string;
  tags: string;
  sector: string;
  errors: Partial<Record<keyof Omit<PostJobType, "errors">, string[]>>;
}

export interface UpdatePostJobType {
  id: string;
  company_name: string;
  job_title: string;
  job_type: string;
  experience: {id:string};
  location: string | number;
  address: string;
  compensation: string;
  additional_perk: string;
  joining_fee: string;
  candidate_requirement: string;
  maximum_education: string;
  total_experience: string;
  job_description: string;
  ctc: string;
  tags: string;
  city :string;
  state :string;
  sector: string;
  errors: Partial<Record<keyof Omit<PostJobType, "errors">, string[]>>;
}

export interface PostJobResponse {
  code: number;
  success: boolean;
  message: string;
  data: Array<{
    user_id: number;
    company_name: string;
    job_title: string;
    job_type: string;
    experience: string;
    location: string;
    address: string;
    compensation: string;
    additional_perk: string;
    joining_fee: string;
    candidate_requirement: string;
    maximum_education: string;
    total_experience: string;
    job_description: string;
    updated_at: string;
    created_at: string;
    ctc: string;
    city :string;
    state :string;
    tags: string;
    id: number;
    sector: string;
    status: string
  }>;
  errors: Partial<Record<keyof Omit<PostJobType, "errors">, string[]>>;
}

export interface PostJobState {
  company_name: string;
  job_title: string;
  job_type: string;
  experience: string;
  location: string;
  address: string;
  compensation: string;
  additional_perk: string;
  joining_fee: string;
  candidate_requirement: string;
  maximum_education: string;
  total_experience: string;
  job_description: string;
  ctc: string;
  city :string;
  state :string;
  tags: string;
  sector: string;
  status: string
  errors: Partial<Record<keyof Omit<PostJobType, "errors">, string[]>>;
}
